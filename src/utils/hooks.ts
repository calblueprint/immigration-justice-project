'use client';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { OnboardingContext } from './OnboardingProvider';

/**
 * Wrapper to use the onboarding context.
 * Throws an error if onboarding context doesn't exist
 * (i.e. the component is not wrapped in a onboarding provider, or it's a server component)
 * @returns the onboarding context object.
 */
const useSafeOnboarding = () => {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Component should be wrapped inside the onboarding context',
    );
  return onboarding;
};

/**
 * Wrapper to use onboarding.
 * Redirects to roles page if flow is empty
 * (i.e. if the user enters the onboarding flow with an URL)
 * @returns the onboarding context object
 */
export const useGuardedOnboarding = () => {
  const onboarding = useSafeOnboarding();
  const { flow, ...rest } = onboarding;
  const { push } = useRouter();

  useEffect(() => {
    if (flow.length === 0) push('/onboarding/');
  }, [flow, push]);

  return { flow, ...rest };
};

/**
 * Provides helpers for navigating onboarding.
 * @returns
 *   flowAt: (at: number) => url
 *   ebbTo: (href: string) => void
 *   backlinkHref: string
 *   pageProgress: number
 */
export const useOnboardingNavigation = () => {
  const onboarding = useGuardedOnboarding();
  const pathname = usePathname();
  const { push } = useRouter();

  const { flow, form, progress: onboardingProgress } = onboarding;

  // describes the current progress
  // i.e. if on roles page, it's 0
  // irrespective of the actual onboarding progress
  const pageProgress = useMemo(
    () => flow.findIndex(f => `/onboarding/${f.url}` === pathname),
    [pathname, flow],
  );

  // gets the URL for a certain step in the flow
  // i.e. 0 -> roles
  const flowAt = useCallback(
    (at: number) => {
      if (flow.length === 0 || at < 0 || at >= flow.length)
        return '/onboarding/';
      return `/onboarding/${flow[at].url}`;
    },
    [flow],
  );

  // safely redirects to a URL
  // but first checks to see if the current form is valid
  // will not redirect otherwise
  const ebbTo = useCallback(
    async (href: string) => {
      const ebber = () => {
        push(href);
      };

      if (
        pageProgress !== onboardingProgress &&
        form &&
        form.isDirty &&
        !form.isValid
      ) {
        form.trigger();
      } else {
        ebber();
      }
    },
    [push, form, pageProgress, onboardingProgress],
  );

  // describes the url to the previous step in the flow
  const backlinkHref = useMemo(
    () => flowAt(pageProgress - 1),
    [flowAt, pageProgress],
  );

  return { flowAt, ebbTo, backlinkHref, pageProgress };
};
