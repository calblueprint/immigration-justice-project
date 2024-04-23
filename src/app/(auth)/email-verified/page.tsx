'use client';

import { SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueLinkButton } from '@/components/Buttons';
import { H2Centered } from '@/styles/text';

export default function EmailVerified() {
  return (
    <SpacerDiv>
      <H2Centered>Your email has been verified!</H2Centered>
      <BigBlueLinkButton type="button" href="/onboarding/roles">
        Go to Onboarding
      </BigBlueLinkButton>
    </SpacerDiv>
  );
}
