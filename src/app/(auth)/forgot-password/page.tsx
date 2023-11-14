'use client';

import { useState } from 'react';
import TextInput from '@/components/TextInput/index';
import { H1, H4 } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
// import COLORS from '@/styles/colors';
import { OuterDiv, FormDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const sendPasswordResetLink = async () => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    });
  };

  return (
    <OuterDiv>
      <FormDiv>
        <H1>Forgot Password</H1>
        <TextInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          id="email"
          value={email}
          setValue={setEmail}
        />
        <BigButton type="button" onClick={() => sendPasswordResetLink()}>
          <H4 $color="white">Send link to email</H4>
        </BigButton>
      </FormDiv>
    </OuterDiv>
  );
}
