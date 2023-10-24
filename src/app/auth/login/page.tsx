'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormDiv } from './styles';
import TextInput from '../../../components/TextInput/TextInput';
import supabase from '../../../api/supabase/createClient';

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
      throw new Error(`An error occurred trying to sign up: ${error.message}`);
    }
    push('/');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign in: ${error.message}`);
    }
    push('/');
  };

  return (
    <FormDiv>
      <TextInput
        label="Email"
        placeholder="example@email.com"
        erroring={false}
        errorText="Email Error"
        type="email"
        name="email"
        value={email}
        setValue={v => setEmail(v)}
      />
      <TextInput
        label="Password"
        placeholder="Input Suggestion"
        erroring={false}
        errorText="Password Error"
        type="password"
        name="password"
        value={password}
        setValue={v => setPassword(v)}
      />
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
    </FormDiv>
  );
}

/*
<input
    type="email"
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
  */