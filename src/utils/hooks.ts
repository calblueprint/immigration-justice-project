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

// checks if flow has been set first
// used to prevent error in the
// edge case of clicking a link to onboarding (when flow is not set)
export const useSafeOnboardingLink = (to: number) => {
  const onboarding = useGuardedOnboarding();
  return onboarding.flow.length > 0
    ? `/onboarding/${onboarding.flow[to].url}`
    : '/onboarding/';
};
