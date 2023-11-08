'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4 } from '@/styles/text';
// import supabase from '@/api/supabase/createClient';
// import COLORS from '@/styles/colors';
import { OuterDiv, FormDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { push } = useRouter();

  return (
    <OuterDiv>
      <FormDiv>
        <H1>Forgot Password</H1>
        <TextInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <BigButton type="button" onClick={() => push('/reset-password')}>
          <H4 $color="white">Send link to email</H4>
        </BigButton>
      </FormDiv>
    </OuterDiv>
  );
}
