'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4, AColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { SpacerDiv, H4Centered, QuestionsDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function SignUp() {
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
    <>
      <H1>Sign Up</H1>
      <SpacerDiv>
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
      </SpacerDiv>
      <SpacerDiv>
        <BigButton type="button" onClick={handleSignUp}>
          <H4 $color="white">Sign Up</H4>
        </BigButton>
        <H4Centered>
          Have an account already?{' '}
          <AColored $color={COLORS.greyDark} href="/login">
            Log In
          </AColored>
        </H4Centered>
      </SpacerDiv>
    </>
  );
}
