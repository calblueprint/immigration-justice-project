'use client';

import { FormContainer, LogoImage, OuterDiv } from '@/app/onboarding/styles';
import IJPLogoBlue from '@/assets/images/ijp_logo_blue.webp';
import CONFIG from '@/lib/configs';
import { useAuth } from '@/utils/AuthProvider';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useProfile } from '@/utils/ProfileProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import ProgressBar from './ProgressBar';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuth();
  const profile = useProfile();
  const onboarding = useContext(OnboardingContext);
  const { push } = useRouter();
  const pathname = usePathname();

  if (!onboarding || !profile)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside onboarding context and profile context',
    );

  if (!profile)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside profile context',
    );

  if (!auth)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside auth context',
    );

  const { flow: onboardingFlow, progress: onboardingProgress } = onboarding;
  const { profileReady, profileData } = profile;
  const { userId } = auth;

  const pageProgress = useMemo(
    () => onboardingFlow.findIndex(f => `/onboarding/${f.url}` === pathname),
    [pathname, onboardingFlow],
  );

  useEffect(() => {
    // out of bounds redirect
    if (
      (onboardingFlow.length !== 0 &&
        onboardingProgress >= onboardingFlow.length) ||
      (profileReady && (profileData || !userId))
    ) {
      push(CONFIG.homepage);
      return;
    }

    if (pageProgress > onboardingProgress)
      push(`/onboarding/${onboardingFlow[onboardingProgress].url}`);
  }, [
    onboardingProgress,
    onboardingFlow,
    profileReady,
    profileData,
    push,
    pageProgress,
    userId,
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
      <LogoImage
        $show={pageProgress !== 0}
        onClick={goToHomepage}
        width="205"
        src={IJPLogoBlue}
        alt="IJP Logo"
      />
      <ProgressBar steps={onboarding.flow.slice(1)} progress={pageProgress} />
      <FormContainer>{children}</FormContainer>
    </OuterDiv>
  );
}
