'use client';

import { H4Centered, SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput/index';
import COLORS from '@/styles/colors';
import { H1, LinkColored, P } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { ProfileContext } from '@/utils/ProfileProvider';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

export default function Login() {
  const auth = useAuth();
  const profile = useContext(ProfileContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { push } = useRouter();
  const validEmail = (e: string) => e !== '' && isEmail(e);

  const handleSignIn = async () => {
    if (!auth) {
      setErrorMessage('');
      return;
    }

    setEmailError(validEmail(email) ? '' : 'Invalid Email');
    setPasswordError(password !== '' ? '' : 'Invalid Password');
    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }

    const { error } = await auth.signIn(email, password);

    if (error) {
      setErrorMessage(error.message);
      // TODO: use error.status to check if it's an email-specific or password-specific error
      // then, raise the error in the TextInput component.
    } else {
      profile?.loadProfile();
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
        <BigBlueButton type="button" onClick={handleSignIn}>
          Log in
        </BigBlueButton>
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
