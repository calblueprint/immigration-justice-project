'use client';

import { useRouter } from 'next/navigation';
import { H1, H4 } from '@/styles/text';
import { OuterDiv, FormDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function ForgotPassword() {
  const { push } = useRouter();

  return (
    <OuterDiv>
      <FormDiv>
        <H1>Your password has been reset.</H1>
        <BigButton type="button" onClick={() => push('/login')}>
          <H4 $color="white">Go to Log In</H4>
        </BigButton>
      </FormDiv>
    </OuterDiv>
  );
}
