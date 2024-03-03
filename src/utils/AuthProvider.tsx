'use client';

import { AuthError, AuthResponse, Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';

// TODO: resolve inconsistent null/undefined types for empty values
export interface AuthContextType {
  session: Session | null;
  userId: UUID | undefined;
  userEmail: string | undefined;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthError | null>;
  signUp: (
    email: string,
    password: string,
    options: object,
  ) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// TODO: we might need error handling here?
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<UUID | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  // set the session, userId, and userEmail
  const setAll = (newSession: Session | null) => {
    if (!newSession) return;
    setSession(newSession);
    if (newSession?.user?.id) {
      const sessionUserId = newSession.user.id as UUID;
      const sessionUserEmail = newSession.user.email;
      setUserId(sessionUserId);
      setUserEmail(sessionUserEmail);
    }
  };

  // on page load, check if there's a session and set it
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setAll(newSession);
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setAll(newSession);
    });
  }, []);

  // sign in and set the session, userId, and userEmail
  const signIn = async (email: string, password: string) => {
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger onAuthStateChange to update the session

    setAll(value.data.session);

    return value;
  };

  // sign out and clear the session, userId, and userEmail
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    setSession(null);
    setUserId(undefined);
    setUserEmail(undefined);

    return error;
  };

  // sign up and set the session, userId, and userEmail
  const signUp = async (email: string, password: string, options: object) => {
    const value = await supabase.auth.signUp({
      email,
      password,
      options: {
        ...options,
      },
    }); // will trigger onAuthStateChange to update the session

    setAll(value.data.session);
    return value;
  };

  const authContextValue = useMemo(
    () => ({
      session,
      userId,
      userEmail,
      signIn,
      signOut,
      signUp,
    }),
    [session, userId, userEmail, signIn, signOut, signUp],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
