'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import isEmail from 'validator/lib/isEmail';
import TextInput from '@/components/TextInput/index';
import { H1, H2, H4, LinkColored, P } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { SpacerDiv, HorizontalDiv, H4Centered } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import Button from '@/components/Button';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const { push } = useRouter();

  const validEmail = (e: string) => e !== '' && isEmail(e);

  const handleSignUp = async () => {
    setEmailError(validEmail(email) ? '' : 'Invalid Email');
    setPasswordError(password !== '' ? '' : 'Invalid Password');
    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }
    setEmailError('');
    setPasswordError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          'https://immigration-justice-project.vercel.app/email-verified',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setEmailSentCount(1);
      setErrorMessage('');
      // push('/verify-email');
    }
  };
  const handleResendEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo:
          'https://immigration-justice-project.vercel.app/email-verified',
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setEmailSentCount(emailSentCount + 1);
      setErrorMessage('');
    }
  };

  return (
    <>
      {!emailSentCount && (
        <>
          <SpacerDiv $gap={0.625}>
            <H1>Sign Up</H1>
            {errorMessage !== '' && (
              <P $color={COLORS.redMid}>{errorMessage}</P>
            )}
          </SpacerDiv>
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
          <SpacerDiv>
            <BigButton type="button" onClick={handleSignUp}>
              Sign Up
            </BigButton>
            <H4Centered>
              Have an account already?{' '}
              <LinkColored $color={COLORS.greyDark} href="/login">
                Log In
              </LinkColored>
            </H4Centered>
          </SpacerDiv>
        </>
      )}
      {emailSentCount > 0 && (
        <SpacerDiv>
          <H2>An email verification link has been sent.</H2>
          <H4 $color={COLORS.greyDark}>
            This link will direct you to the next step. If you didn’t receive an
            email, please click Resend Email.
          </H4>
          <HorizontalDiv>
            <Button
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              onClick={handleResendEmail}
            >
              <H4 $color="white">Resend Email</H4>
            </Button>
            {emailSentCount > 1 && (
              <P $color={COLORS.greyMid}>Email has been resent!</P>
            )}
          </HorizontalDiv>
        </SpacerDiv>
      )}
    </>
  );
}
