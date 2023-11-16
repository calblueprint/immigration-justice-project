'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H2, H4, AColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import { SpacerDiv, H4Centered } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import Button from '@/components/Button';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  // const { push } = useRouter();
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign up: ${error.message}`);
    }
    setEmailSent(true);
    // push('/verify-email');
  };
  const handleResendEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email, // 'email@example.com',
    });
    if (error) {
      throw new Error(
        `An error occurred trying to resend email: ${error.message}`,
      );
    }
  };

  return (
    <>
      {!emailSent && (
        <>
          <H1>Sign Up</H1>
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
      )}
      {emailSent && (
        <SpacerDiv>
          <H2>An email verification link has been sent.</H2>
          <H4 $color={COLORS.greyDark}>
            This link will direct you to the next step. If you didn’t receive an
            email, please click Resend Email.{' '}
          </H4>
          <Button
            $primaryColor={COLORS.blueMid}
            $secondaryColor={COLORS.blueDark}
            onClick={() => handleResendEmail()}
          >
            <H4 $color="white">Resend Email</H4>
          </Button>
        </SpacerDiv>
      )}
    </>
  );
}
