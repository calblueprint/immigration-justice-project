'use client';

import { useRouter } from 'next/navigation';
import { H2, H4 } from '@/styles/text';
import BigButton from '@/components/BigButton';
import { SpacerDiv } from '../styles';

export default function ConfirmResetPassword() {
  const { push } = useRouter();

  return (
    <SpacerDiv>
      <H2>Your password has been reset.</H2>
      <BigButton type="button" onClick={() => push('/login')}>
        <H4 $color="white">Go to Log In</H4>
      </BigButton>
    </SpacerDiv>
  );
}
