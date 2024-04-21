'use client';

import { BigLinkButton } from '@/components/Buttons';
import { H2, H4 } from '@/styles/text';
import { SpacerDiv } from '../styles';

export default function ConfirmResetPassword() {
  return (
    <SpacerDiv>
      <H2>Your password has been reset.</H2>
      <BigLinkButton href="/login">
        <H4 $color="white">Go to Log In</H4>
      </BigLinkButton>
    </SpacerDiv>
  );
}
