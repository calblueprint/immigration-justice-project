'use client';

import { useRouter } from 'next/navigation';
import { H2 } from '@/styles/text';
import { SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function EmailVerified() {
  const { push } = useRouter();

  return (
    <SpacerDiv>
      <H2>Your email has been verified!</H2>
      <BigButton type="button" onClick={() => push('/onboarding/roles')}>
        Go to Onboarding
      </BigButton>
    </SpacerDiv>
  );
}
