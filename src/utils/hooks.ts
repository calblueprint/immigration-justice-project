'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingContext } from './OnboardingProvider';

export const useGuardedOnboarding = () => {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Component should be wrapped inside the onboarding context',
    );

  const { flow, ...rest } = onboarding;
  const { push } = useRouter();

  useEffect(() => {
    if (flow.length === 0) push('/onboarding/');
  }, [flow, push]);

  return { flow, ...rest };
};
