'use client';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CONFIG from '@/lib/configs';
import { useAuth } from './AuthProvider';
import { OnboardingContext } from './OnboardingProvider';
import { useProfile } from './ProfileProvider';

/**
 * Wrapper to use profile and auth
 * Throws an error if neither contexts does not exist
 * Redirects to home page if not logged in
 */
export const useProfileAuth = () => {
  const auth = useAuth();
  if (!auth)
    throw new Error('Component should be wrapped inside an auth context!');

  const profile = useProfile();
  if (!profile)
    throw new Error('Component should be wrapped inside a profile context!');

  const { push } = useRouter();
  const { profileReady } = profile;
  const { userId } = auth;

  useEffect(() => {
    if (profileReady && !userId) push(CONFIG.homepage);
  }, [profileReady, userId, push]);

  return { profile, auth };
};

/**
 * Scroll to top on first render
 */
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
};

/**
 * Wrapper to use onboarding.
 * Redirects to roles page if flow is empty
 * (i.e. if the user enters the onboarding flow with an URL)
 * @returns the onboarding context object
 */
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
