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
  const { push } = useRouter();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      push('/');
    }
  };

  return (
    <>
      <SpacerDiv $gap={0.625}>
        <H1>Log In</H1>
        {errorMessage !== '' && <P $color={COLORS.redMid}>{errorMessage}</P>}
      </SpacerDiv>
      <SpacerDiv $gap={13 / 16}>
        <SpacerDiv>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            errorText={email === '' ? 'Invalid Email' : ''}
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            errorText={
              password === '' || password.length < 6 ? 'Invalid Password' : ''
            }
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
