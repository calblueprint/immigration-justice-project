'use client';

import { useRouter } from 'next/navigation';
import { H2 } from '@/styles/text';
import { SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueButton } from '@/components/Buttons';

export default function EmailVerified() {
  const { push } = useRouter();

  return (
    <SpacerDiv>
      <H2>Your email has been verified!</H2>
      <BigBlueButton type="button" onClick={() => push('/onboarding/roles')}>
        Go to Onboarding
      </BigBlueButton>
    </SpacerDiv>
  );
}
