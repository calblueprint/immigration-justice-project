'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import isEmail from 'validator/lib/isEmail';
import { PCentered } from '@/app/(auth)/styles';
import { BigBlueButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput/index';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex, SmallCardForm } from '@/styles/containers';
import { H1, LinkColored, P } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { ProfileContext } from '@/utils/ProfileProvider';

export default function Login() {
  const auth = useAuth();
  const profile = useContext(ProfileContext);
  if (!auth || !profile) {
    throw new Error('Page must have auth and profile context defined');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { push } = useRouter();
  const validEmail = (e: string) => e !== '' && isEmail(e);

  useEffect(() => {
    if (auth.userId && !isLoggingIn) push(CONFIG.settings);
  }, [auth, profile, push, isLoggingIn]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
      setErrorMessage('');
      return;
    }

    setEmailError(validEmail(email) ? '' : 'Email not found');
    setPasswordError(password !== '' ? '' : 'Password is incorrect');
    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }

    setIsLoggingIn(true);
    const { error, data } = await auth.signIn(email, password);

    if (error) {
      setErrorMessage(error.message);
      // TODO: use error.status to check if it's an email-specific or password-specific error
      // then, raise the error in the TextInput component.
    } else {
      setErrorMessage('');
      const loadedProfile = await profile.loadProfile(data.user?.id);

      if (!loadedProfile) {
        push(CONFIG.onboardingHome);
        return;
      }

      // conditional routing after logging in
      if (!loadedProfile.profileData) push(CONFIG.onboardingHome);
      else if (loadedProfile.roles.find(role => role.role === 'ATTORNEY'))
        push(CONFIG.cases);
      else if (loadedProfile.roles.find(role => role.role === 'LEGAL_FELLOW'))
        push(CONFIG.lca);
      else push(CONFIG.languageSupport);
    }
  };

  return (
    <SmallCardForm onSubmit={handleSignIn}>
      <Flex $direction="column" $gap="10px">
        <H1>Log In</H1>
        {errorMessage !== '' && <P $color={COLORS.redMid}>{errorMessage}</P>}
      </Flex>
      <Flex $direction="column" $gap="13px">
        <Flex $direction="column" $gap="20px">
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
        </Flex>
        <P>
          <LinkColored href="/forgot-password" $color={COLORS.greyMid}>
            Forgot your password?
          </LinkColored>
        </P>
      </Flex>
      <Flex $direction="column" $gap="20px">
        <BigBlueButton type="submit">Log In</BigBlueButton>
        <PCentered>
          Don’t have an account yet?{' '}
          <LinkColored $color={COLORS.blueMid} href="/signup">
            Sign up
          </LinkColored>
        </PCentered>
      </Flex>
    </SmallCardForm>
  );
}
