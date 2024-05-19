'use client';

import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import supabase from '@/api/supabase/createClient';
import { AuthSubHeading, H4Centered } from '@/app/(auth)/styles';
import { BigBlueButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput/index';
import COLORS from '@/styles/colors';
import { Flex, SmallCardForm } from '@/styles/containers';
import { H1, H4, P } from '@/styles/text';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [emailError, setEmailError] = useState('');

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setEmailError('Email not found');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        'https://immigration-justice-project.vercel.app/reset-password',
    });
    if (error) {
      setEmailError('Something went wrong. Please try again later.');
      return;
    }
    setEmailSentCount(emailSentCount + 1);
  };

  return (
    <SmallCardForm onSubmit={handleForgotPassword}>
      {emailSentCount === 0 ? (
        <>
          <H1>Forgot Password?</H1>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            type="email"
            id="email"
            errorText={emailError}
            value={email}
            setValue={setEmail}
          />
          <BigBlueButton type="submit">
            <H4 $color="white">Send link to email</H4>
          </BigBlueButton>
        </>
      ) : (
        <Flex $direction="column" $align="center" $gap="20px">
          <AuthSubHeading $align="center">
            A password reset link has been sent to your email.
          </AuthSubHeading>
          <H4Centered $color={COLORS.greyDark}>
            This link will direct you to the next step. If you didn’t receive an
            email, please click Resend Email.
          </H4Centered>
          <BigBlueButton type="submit">
            <H4 $color="white">Resend Email</H4>
          </BigBlueButton>
          {emailSentCount > 1 && (
            <P $color={COLORS.blueMid}>Email has been resent!</P>
          )}
        </Flex>
      )}
    </SmallCardForm>
  );
}
