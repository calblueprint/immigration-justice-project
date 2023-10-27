'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4Centered, AColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { FormDiv, QuestionsDiv, SixteenDiv } from '../styles';

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

  return (
    <FormDiv>
      <H1>Sign Up</H1>
      <SixteenDiv>
        <QuestionsDiv>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            erroring={false}
            errorText="Email Error" // {errorMessage}
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            erroring={false}
            errorText="Password Error"
            type="password"
            name="password"
            value={password}
            setValue={setPassword}
          />
        </QuestionsDiv>
      </SixteenDiv>
      <SixteenDiv>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <H4Centered>
          Have an account already?{' '}
          <AColored $color={COLORS.existingInputColor} href="/auth/login">
            Log In
          </AColored>
        </H4Centered>
      </SixteenDiv>
    </FormDiv>
  );
}
