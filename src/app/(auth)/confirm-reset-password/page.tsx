'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import { Flex, SmallCard } from '@/styles/containers';
import { H4 } from '@/styles/text';
import { AuthSubHeading } from '../styles';

export default function ConfirmResetPassword() {
  return (
    <SmallCard>
      <Flex $direction="column" $gap="20px">
        <AuthSubHeading>Your password has been reset!</AuthSubHeading>
        <BigBlueLinkButton href="/login">
          <H4 $color="white">Go to Log In</H4>
        </BigBlueLinkButton>
      </Flex>
    </SmallCard>
  );
}
