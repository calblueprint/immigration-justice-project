'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import { H2, H4 } from '@/styles/text';
import { FormDiv, SpacerDiv } from '../styles';

export default function ConfirmResetPassword() {
  return (
    <FormDiv>
      <SpacerDiv>
        <H2>Your password has been reset.</H2>
        <BigBlueLinkButton href="/login">
          <H4 $color="white">Go to Log In</H4>
        </BigBlueLinkButton>
      </SpacerDiv>
    </FormDiv>
  );
}
