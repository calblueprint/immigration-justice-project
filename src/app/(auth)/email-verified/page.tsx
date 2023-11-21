'use client';

import { H2, H4 } from '@/styles/text';
import { OuterDiv, FormDiv, SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function EmailVerified() {
  return (
    <OuterDiv>
      <FormDiv>
        <SpacerDiv>
          <H2>Your email has been verified!</H2>
          <BigButton type="button">
            <H4 $color="white">Go to Onboarding</H4>
          </BigButton>
        </SpacerDiv>
      </FormDiv>
    </OuterDiv>
  );
}
