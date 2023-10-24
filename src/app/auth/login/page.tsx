'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1 } from '@/styles/text';
import { FormDiv, QuestionsDiv, ForgotPassword, SixteenDiv } from './styles';
import supabase from '../../../api/supabase/createClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
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
      <H1>Log In</H1>
      <SixteenDiv>
        <QuestionsDiv>
          <TextInput
            label="Email"
            placeholder="example@email.com"
            erroring={false}
            errorText="Email Error" // {errorMessage}
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Password"
            placeholder="Input Suggestion"
            erroring={false}
            errorText="Password Error"
            type="password"
            name="password"
            value={password}
            setValue={setPassword}
          />
        </QuestionsDiv>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </SixteenDiv>
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
    </FormDiv>
  );
}
