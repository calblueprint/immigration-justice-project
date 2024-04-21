'use client';

import { FormDiv, SpacerDiv } from '@/app/(auth)/styles';
import { BigBlueLinkButton } from '@/components/Buttons';
import { H2 } from '@/styles/text';

export default function EmailVerified() {
  return (
    <FormDiv>
      <SpacerDiv>
        <H2>Your email has been verified!</H2>
        <BigBlueLinkButton type="button" href="/onboarding/roles">
          Go to Onboarding
        </BigBlueLinkButton>
      </SpacerDiv>
    </FormDiv>
  );
}
