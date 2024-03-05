'use client';

import { useRouter } from 'next/navigation';
import { H2 } from '@/styles/text';
import { SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import NavBar from '@/components/NavBar';

export default function EmailVerified() {
  const { push } = useRouter();
  return (
    <>
      <NavBar />
      <SpacerDiv>
        <H2>Your email has been verified!</H2>
        <BigButton type="button" onClick={() => push('/onboarding/roles')}>
          Go to Onboarding
        </BigButton>
      </SpacerDiv>
    </>
  );
}
