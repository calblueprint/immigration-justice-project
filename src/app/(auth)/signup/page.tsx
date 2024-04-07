'use client';

import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import supabase from '@/api/supabase/createClient';
import { H4Centered, HorizontalDiv, SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueButton, Button } from '@/components/Buttons';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput/index';
import COLORS from '@/styles/colors';
import { H1, H2, H4, LinkColored, P } from '@/styles/text';
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

  const handleSignUp = async () => {
    if (!auth) return;
    setEmailError(validEmail(email) ? '' : 'Invalid Email');
    setPasswordError(password !== '' ? '' : 'Invalid Password');
    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }
    if (!passwordComplexity) {
      setPasswordError('Password must meet complexity requirements');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setEmailError('');
    setPasswordError('');
    const { error } = await auth.signUp(email, password, {
      emailRedirectTo:
        'https://immigration-justice-project.vercel.app/email-verified',
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setEmailSentCount(1);
      setErrorMessage('');
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
          <SpacerDiv $gap={10}>
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
          <SpacerDiv $gap={8}>
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
          </SpacerDiv>
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <SpacerDiv>
            <BigBlueButton type="button" onClick={handleSignUp}>
              Sign Up
            </BigBlueButton>
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
