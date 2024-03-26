'use client';

import { FormContainer, LogoImage, OuterDiv } from '@/app/onboarding/styles';
import CONFIG from '@/lib/configs';
import { useAuth } from '@/utils/AuthProvider';
import { useGuardedOnboarding, useOnboardingNavigation } from '@/utils/hooks';
import { useProfile } from '@/utils/ProfileProvider';
import IJPLogoBlue from '~/public/images/ijp_logo_blue.webp';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { UnstyledButton } from './Buttons';
import ProgressBar from './ProgressBar';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuth();
  const profile = useProfile();
  const onboarding = useGuardedOnboarding();

  const { pageProgress } = useOnboardingNavigation();
  const { push } = useRouter();

  if (!profile)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside profile context',
    );

  if (!auth)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside auth context',
    );

  const {
    flow: onboardingFlow,
    progress: onboardingProgress,
    setProgress,
  } = onboarding;
  const { profileReady, profileData } = profile;
  const { userId } = auth;

  useEffect(() => {
    if (
      // edge case (realistically shouldn't happen)
      onboardingProgress < 0 ||
      // progress beyond length of flow
      (onboardingFlow.length !== 0 &&
        onboardingProgress >= onboardingFlow.length) ||
      // already onboarded or not signed in
      (profileReady && (profileData || !userId))
    ) {
      push(CONFIG.homepage);
      return;
    }

    // advance progress if exactly 1 more
    if (pageProgress === onboardingProgress + 1) setProgress(pageProgress);
    // otherwise, rebound to current progress
    else if (pageProgress > onboardingProgress)
      push(`/onboarding/${onboardingFlow[onboardingProgress].url}`);
  }, [
    onboardingProgress,
    onboardingFlow,
    profileReady,
    profileData,
    push,
    pageProgress,
    userId,
    setProgress,
  ]);

  const goToHomepage = () => {
    // TODO: add form dirty bool to context to conditionally show dialog
    // eslint-disable-next-line no-alert
    const ans = window.confirm(
      'Are you sure you want to continue? Your changes will not be saved after you leave.',
    );
    if (ans) push(CONFIG.homepage);
  };

  return (
    <OuterDiv>
      <UnstyledButton onClick={goToHomepage}>
        <LogoImage
          $show={pageProgress !== 0}
          width="205"
          src={IJPLogoBlue}
          alt="IJP Logo"
        />
      </UnstyledButton>
      <ProgressBar steps={onboarding.flow.slice(1)} progress={pageProgress} />
      <FormContainer>{children}</FormContainer>
    </OuterDiv>
  );
}
