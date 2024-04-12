'use client';

import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import supabase from '@/api/supabase/createClient';
import { HorizontalDiv, SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueButton, Button } from '@/components/Buttons';
import TextInput from '@/components/TextInput/index';
import COLORS from '@/styles/colors';
import { H1, H2, H4, P } from '@/styles/text';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [emailError, setEmailError] = useState('');

  const sendPasswordResetLink = async () => {
    if (!isEmail(email)) {
      setEmailError('Invalid email.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password', // TEMPORARY SWITCH BACK FOR TESTING
    });
    if (error) {
      setEmailError(error.message);
      return;
    }
    setEmailSentCount(emailSentCount + 1);
  };

  return (
    <>
      {!emailSentCount && (
        <>
          <H1>Forgot Password</H1>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            type="email"
            id="email"
            errorText={emailError}
            value={email}
            setValue={setEmail}
          />
          <BigBlueButton type="button" onClick={sendPasswordResetLink}>
            <H4 $color="white">Send link to email</H4>
          </BigBlueButton>
        </>
      )}
      {emailSentCount > 0 && (
        <SpacerDiv>
          <H2>A password reset link has been sent to your email.</H2>
          <H4 $color={COLORS.greyDark}>
            This link will direct you to the next step. If you didn’t receive an
            email, please click Resend Email.
          </H4>
          <HorizontalDiv>
            <Button
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              onClick={sendPasswordResetLink}
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
