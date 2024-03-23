'use client';

import { OuterDiv, FormContainer, LogoImage } from '@/app/onboarding/styles';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';
import CONFIG from '@/lib/configs';
import IJPLogoBlue from '@/assets/images/ijp_logo_blue.webp';
import ProgressBar from './ProgressBar';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const profile = useContext(ProfileContext);
  const onboarding = useContext(OnboardingContext);
  const { push } = useRouter();
  const pathname = usePathname();

  if (!onboarding)
    throw new Error(
      'Fatal: onboarding manager should be wrapped inside onboarding context',
    );

  const { flow: onboardingFlow, progress: onboardingProgress } = onboarding;

  const pageProgress = useMemo(
    () => onboardingFlow.findIndex(f => `/onboarding/${f.url}` === pathname),
    [pathname, onboardingFlow],
  );

  useEffect(() => {
    // out of bounds redirect
    if (
      onboardingProgress < 0 ||
      onboardingProgress >= onboardingFlow.length ||
      !profile?.userId ||
      (profile?.profileReady && profile?.profileData)
    ) {
      push(CONFIG.homepage);
      return;
    }

    if (pageProgress > onboardingProgress)
      push(`/onboarding/${onboardingFlow[onboardingProgress].url}`);
  }, [onboardingProgress, onboardingFlow, profile, push, pageProgress]);

  const goToHomepage = () => {
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
