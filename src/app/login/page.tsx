'use client';

import { useState } from 'react';
import supabase from '../../api/supabase/createClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
    });
  };

  const signInWithEmail = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
      <button type="button" onClick={signInWithEmail}>
        Sign in
      </button>
    </>
  );
}
