'use client';

import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext, useEffect } from 'react';

export default function Page() {
  const onboarding = useContext(OnboardingContext);

  useEffect(() => {
    if (onboarding) onboarding.setCanContinue(true);
  }, [onboarding]);

  return <H1>You&apos;re all set!</H1>;
}
