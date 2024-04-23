'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import { H2Centered, H4 } from '@/styles/text';
import { SpacerDiv } from '../styles';

export default function ConfirmResetPassword() {
  return (
    <SpacerDiv>
      <H2Centered>Your password has been reset!</H2Centered>
      <BigBlueLinkButton href="/login">
        <H4 $color="white">Go to Log In</H4>
      </BigBlueLinkButton>
    </SpacerDiv>
  );
}
