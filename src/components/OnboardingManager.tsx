'use client';

import { FormContainer, OuterDiv } from '@/app/onboarding/styles';
import CONFIG from '@/lib/configs';
import { AuthContext } from '@/utils/AuthProvider';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { ProfileContext } from '@/utils/ProfileProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import ProgressBar from './ProgressBar';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const onboarding = useContext(OnboardingContext);
  const router = useRouter();
  const pathname = usePathname();

  if (!onboarding)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside onboarding context',
    );

  const pageProgress = useMemo(() => {
    if (!onboarding) return -1;
    const find = onboarding.flow.findIndex(
      f => `/onboarding/${f.url}` === pathname,
    );
    return find;
  }, [pathname, onboarding]);

  useEffect(() => {
    if (!onboarding) return;

    // out of bounds redirect
    if (
      onboarding.progress < 0 ||
      onboarding.progress >= onboarding.flow.length ||
      !auth?.userId ||
      (profile?.profileReady && profile?.profileData)
    ) {
      router.push(CONFIG.homepage);
      return;
    }

    if (pageProgress > onboarding.progress)
      router.push(`/onboarding/${onboarding.flow[onboarding.progress].url}`);
  }, [onboarding, profile, router, pageProgress, auth]);

  return (
    <OuterDiv>
      <ProgressBar steps={onboarding.flow.slice(1)} progress={pageProgress} />
      <FormContainer>{children}</FormContainer>
    </OuterDiv>
  );
}
