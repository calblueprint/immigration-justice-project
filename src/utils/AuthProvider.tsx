'use client';

import {Session} from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import supabase from '@/api/supabase/createClient';

export interface AuthState {
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthState);

export const useAuth = () => {
  // we might need error handling here?
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, []);

  const authContextValue = useMemo(
    () => ({
      session,
    }),
    [session],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}