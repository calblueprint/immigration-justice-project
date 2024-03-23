'use client';

import { H1Centered } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';
import { Flex } from '@/styles/containers';
import { BigButton, BigLinkButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import { NormalFormDiv } from '../styles';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: onboarding review should be wrapped in the onboarding context',
    );

  return (
    <NormalFormDiv>
      <H1Centered>Review & Submit</H1Centered>

      <Flex $gap="40px">
        <BigLinkButton
          href={`/onboarding/${onboarding.flow[onboarding.progress - 1].url}`}
        >
          Back
        </BigLinkButton>
        <BigButton
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          $tertiaryColor={COLORS.blueDarker}
        >
          Submit
        </BigButton>
      </Flex>
    </NormalFormDiv>
  );
}
