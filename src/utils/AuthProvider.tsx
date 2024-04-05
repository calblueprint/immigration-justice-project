'use client';

import { AuthError, AuthResponse, Session } from '@supabase/supabase-js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';

export interface AuthContextType {
  session?: Session;
  userId?: UUID;
  userEmail?: string;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthError | null>;
  signUp: (
    email: string,
    password: string,
    options: object,
  ) => Promise<AuthResponse>;
}

export type SignUpOptions = {
  emailRedirectTo?: string;
  data?: object;
  captchaToken?: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [userId, setUserId] = useState<UUID | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  // set the session, userId, and userEmail
  const setAll = (newSession: Session | null) => {
    console.log(newSession);
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
  const signIn = useCallback(async (email: string, password: string) => {
    console.log('signIn function');
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger onAuthStateChange to update the session

    return value;
  }, []);

  // sign out and clear the session, userId, and userEmail
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(undefined);
      setUserId(undefined);
      setUserEmail(undefined);
    }

    return error;
  }, []);

  // sign up and set the session, userId, and userEmail
  const signUp = useCallback(
    async (email: string, password: string, options: SignUpOptions) => {
      const value = await supabase.auth.signUp({
        email,
        password,
        options,
      }); // will trigger onAuthStateChange to update the session

      return value;
    },
    [],
  );

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
