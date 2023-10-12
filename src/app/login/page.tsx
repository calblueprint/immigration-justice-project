'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../api/supabase/createClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign up: ${error}`);
    }
    push('/');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign in: ${error}`);
    }
    push('/');
  };

  return (
    <>
      <input
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
    </>
  );
}
