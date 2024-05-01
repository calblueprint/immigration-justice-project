'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import { SmallCard } from '@/styles/containers';
import { H2, H4 } from '@/styles/text';
import { SpacerDiv } from '../styles';

export default function ConfirmResetPassword() {
  return (
    <SmallCard>
      <SpacerDiv>
        <H2>Your password has been reset.</H2>
        <BigBlueLinkButton href="/login">
          <H4 $color="white">Go to Log In</H4>
        </BigBlueLinkButton>
      </SpacerDiv>
    </SmallCard>
  );
}
