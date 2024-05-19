'use client';

import { BigBlueLinkButton } from '@/components/Buttons';
import Icon from '@/components/Icon';
import CONFIG from '@/lib/configs';
import { Flex, SmallCard } from '@/styles/containers';
import { AuthSubHeading } from '../styles';

export default function EmailVerified() {
  return (
    <SmallCard>
      <Flex $direction="column" $align="center" $gap="20px">
        <Icon type="blue_check" />
        <AuthSubHeading>Your email has been verified!</AuthSubHeading>
        <BigBlueLinkButton type="button" href={CONFIG.onboardingHome}>
          Go to Onboarding
        </BigBlueLinkButton>
      </Flex>
    </SmallCard>
  );
}
