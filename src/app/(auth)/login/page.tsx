'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, P, AColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { H4Centered, QuestionsDiv, SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();

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
    <>
      <H1>Log In</H1>
      <SpacerDiv>
        <QuestionsDiv>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            errorText="Email Error" // {errorMessage}
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            errorText="Password Error"
            type="password"
            id="password"
            value={password}
            setValue={setPassword}
          />
        </QuestionsDiv>
        <P>
          <AColored $color={COLORS.greyMid} href="/reset-password">
            Forgot your password?
          </AColored>
        </P>
      </SpacerDiv>
      <SpacerDiv>
        <BigButton type="button" onClick={handleSignIn}>
          Sign in
        </BigButton>
        <H4Centered>
          Don’t have an account yet?{' '}
          <AColored $color={COLORS.greyDark} href="/signup">
            Sign up
          </AColored>
        </H4Centered>
      </SpacerDiv>
    </>
  );
}
