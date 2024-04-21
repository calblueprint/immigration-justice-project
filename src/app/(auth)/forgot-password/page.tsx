'use client';

import supabase from '@/api/supabase/createClient';
import { HorizontalDiv, SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput/index';
import COLORS from '@/styles/colors';
import { H1, H2, H4, P } from '@/styles/text';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [emailError, setEmailError] = useState('');

  const sendPasswordResetLink = async () => {
    if (!isEmail(email)) {
      setEmailError('Could not find email');
      return;
    }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        'https://immigration-justice-project.vercel.app/reset-password',
    });
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
          <BigButton type="button" onClick={sendPasswordResetLink}>
            <H4 $color="white">Send link to email</H4>
          </BigButton>
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
