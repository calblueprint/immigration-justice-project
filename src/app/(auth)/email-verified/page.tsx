'use client';

import { SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueLinkButton } from '@/components/Buttons';
import { SmallCard } from '@/styles/containers';
import { H2 } from '@/styles/text';

export default function EmailVerified() {
  return (
    <SmallCard>
      <SpacerDiv>
        <H2>Your email has been verified!</H2>
        <BigBlueLinkButton type="button" href="/onboarding/roles">
          Go to Onboarding
        </BigBlueLinkButton>
      </SpacerDiv>
    </SmallCard>
  );
}
