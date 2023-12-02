'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import TextInput from '@/components/TextInput/index';
import { H1, P, LinkColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { H4Centered, SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { push } = useRouter();

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      if (email === '') {
        setEmailError('Invalid Email');
      } else {
        setEmailError('');
      }
      if (password === '') {
        setPasswordError('Invalid Password');
      } else {
        setPasswordError('');
      }
      setErrorMessage('');
      return;
    }
    setEmailError('');
    setPasswordError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      // TODO: use error.status to check if it's an email-specific or password-specific error
      // then, raise the error in the TextInput component.
    } else {
      setErrorMessage('');
      push('/cases');
    }
  };

  return (
    <>
      <SpacerDiv $gap={0.625}>
        <H1>Log In</H1>
        {errorMessage !== '' && <P $color={COLORS.redMid}>{errorMessage}</P>}
      </SpacerDiv>
      <SpacerDiv $gap={0.8125}>
        <SpacerDiv>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            errorText={emailError}
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            errorText={passwordError}
            type="password"
            id="password"
            value={password}
            setValue={setPassword}
          />
        </SpacerDiv>
        <P>
          <LinkColored href="/forgot-password" $color={COLORS.greyMid}>
            Forgot your password?
          </LinkColored>
        </P>
      </SpacerDiv>
      <SpacerDiv>
        <BigButton type="button" onClick={handleSignIn}>
          Log in
        </BigButton>
        <H4Centered>
          Don’t have an account yet?{' '}
          <LinkColored $color={COLORS.greyDark} href="/signup">
            Sign up
          </LinkColored>
        </H4Centered>
      </SpacerDiv>
    </>
  );
}
