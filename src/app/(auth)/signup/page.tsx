'use client';

import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import supabase from '@/api/supabase/createClient';
import { AuthSubHeading, H4Centered, PCentered } from '@/app/(auth)/styles';
import { BigBlueButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput/index';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex, SmallCardForm } from '@/styles/containers';
import { H1, H4, LinkColored, P } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';

export default function SignUp() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordComplexity, setPasswordComplexity] = useState(false);

  const validEmail = (e: string) => e !== '' && isEmail(e);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) return;

    setEmailError(validEmail(email) ? '' : 'Invalid email');
    setPasswordError(password !== '' ? '' : 'Invalid password');

    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }

    if (!passwordComplexity) {
      setPasswordError('Password must meet complexity requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setEmailError('');
    setPasswordError('');

    const { error } = await auth.signUp(email, password, {
      emailRedirectTo: CONFIG.emailVerified,
    });

    if (error) {
      setErrorMessage(error.message);
      await auth.signOut();
    } else {
      setEmailSentCount(1);
      setErrorMessage('');
    }
  };

  const handleResendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: CONFIG.emailVerified,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setEmailSentCount(emailSentCount + 1);
      setErrorMessage('');
    }
  };

  return emailSentCount === 0 ? (
    <SmallCardForm onSubmit={handleSignUp}>
      <Flex $direction="column" $gap="10px">
        <H1>Sign Up</H1>
        {errorMessage !== '' && <P $color={COLORS.redMid}>{errorMessage}</P>}
      </Flex>
      <TextInput
        label="Email"
        placeholder="email@example.com"
        errorText={emailError}
        type="email"
        id="email"
        value={email}
        setValue={setEmail}
      />
      <Flex $direction="column" $gap="8px">
        <TextInput
          label="Password"
          placeholder="Password"
          errorText={passwordError}
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
        />
        <PasswordComplexity
          password={password}
          setComplexity={setPasswordComplexity}
        />
      </Flex>
      <TextInput
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <Flex $direction="column" $gap="20px">
        <BigBlueButton type="submit">Sign Up</BigBlueButton>
        <PCentered>
          Have an account already?{' '}
          <LinkColored $color={COLORS.blueMid} href={CONFIG.login}>
            Log in
          </LinkColored>
        </PCentered>
      </Flex>
    </SmallCardForm>
  ) : (
    <SmallCardForm onSubmit={handleResendEmail}>
      <Flex $direction="column" $align="center" $gap="20px">
        <Icon type="email" />
        <AuthSubHeading>Verification email sent!</AuthSubHeading>
        <H4Centered $color={COLORS.greyDark}>
          This link will direct you to the next step. If you didn’t receive an
          email, please click Resend Email.
        </H4Centered>
        <BigBlueButton type="submit">
          <H4 $color="white">Resend Email</H4>
        </BigBlueButton>
        {emailSentCount > 1 && (
          <P $color={COLORS.greyDark}>
            Email has been sent to
            <span style={{ color: COLORS.blueDark }}> {email}</span>
          </P>
        )}
      </Flex>
    </SmallCardForm>
  );
}
