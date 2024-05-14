'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import CONFIG from '@/lib/configs';
import { Flex, SmallCard } from '@/styles/containers';
import { H2 } from '@/styles/text';

export default function EmailVerified() {
  return (
    <SmallCard>
      <Flex $direction="column" $gap="20px">
        <H2>Your email has been verified!</H2>
        <BigBlueLinkButton type="button" href={CONFIG.onboardingHome}>
          Go to Onboarding
        </BigBlueLinkButton>
      </Flex>
    </SmallCard>
  );
}
