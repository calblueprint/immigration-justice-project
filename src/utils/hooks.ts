'use client';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
export const useOnboardingNavigation = () => {
  const onboarding = useGuardedOnboarding();
  const pathname = usePathname();

  const { flow } = onboarding;

  const pageProgress = useMemo(
    () => flow.findIndex(f => `/onboarding/${f.url}` === pathname),
    [pathname, flow],
  );

  const flowAt = useCallback(
    (at: number) => {
      if (flow.length === 0 || at < 0 || at >= flow.length)
        return '/onboarding/';
      return `/onboarding/${flow[at].url}`;
    },
    [flow],
  );

  const backlinkHref = useMemo(
    () => flowAt(pageProgress - 1),
    [flowAt, pageProgress],
  );

  return { flowAt, backlinkHref, pageProgress };
};
