'use client';

import { OuterDiv, FormContainer, LogoImage } from '@/app/onboarding/styles';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';
import CONFIG from '@/lib/configs';
import IJPLogoBlue from '@/assets/images/ijp_logo_blue.webp';
import { useGuardedOnboarding, useOnboardingNavigation } from '@/utils/hooks';
import ProgressBar from './ProgressBar';
import { UnstyledButton } from './Buttons';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const profile = useContext(ProfileContext);
  if (!profile)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside onboarding context and profile context',
    );

  const onboarding = useGuardedOnboarding();
  const { pageProgress } = useOnboardingNavigation();
  const { push } = useRouter();

  const {
    flow: onboardingFlow,
    progress: onboardingProgress,
    setProgress,
  } = onboarding;

  useEffect(() => {
    if (
      // edge case (realistically shouldn't happen)
      onboardingProgress < 0 ||
      // progress beyond length of flow
      (onboardingFlow.length !== 0 &&
        onboardingProgress >= onboardingFlow.length) ||
      // already onboarded or not signed in
      (profile.profileReady && (profile.profileData || !profile.userId))
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
    profile,
    push,
    pageProgress,
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
