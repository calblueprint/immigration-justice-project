'use client';

import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';

export default function Page() {
  const onboarding = useContext(OnboardingContext);

  return (
    <>
      <H1>Roles</H1>
      <Button
        $primaryColor={COLORS.blueMid}
        $secondaryColor={COLORS.blueDark}
        onClick={() => onboarding && onboarding.setCanContinue(true)}
      >
        Enable continue
      </Button>
    </>
  );
}
