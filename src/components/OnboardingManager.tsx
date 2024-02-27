'use client';

import { FormDiv, OuterDiv, FormContainer } from '@/app/onboarding/styles';
import { BackLink, H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';
import ProgressBar from './ProgressBar';
import BigButton from './BigButton';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
  const profile = useContext(ProfileContext);
  const onboarding = useContext(OnboardingContext);
  const router = useRouter();
  const pathname = usePathname();
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
      profile?.userId ||
      (profile?.profileReady && profile?.profileData)
    ) {
      router.push('/cases');
      return;
    }

    if (pageProgress > onboarding.progress)
      router.push(`/onboarding/${onboarding.flow[onboarding.progress].url}`);
  }, [onboarding, profile, router, pageProgress]);

  const advanceProgress = () => {
    // safeguard
    if (!onboarding) return;
    if (pageProgress > onboarding.progress) return;

    const newProgress = pageProgress + 1;

    if (
      newProgress > onboarding.progress &&
      onboarding.progress < onboarding.flow.length - 1
    ) {
      onboarding.setCanContinue(false);
      onboarding.setProgress(newProgress);
    }

    if (newProgress >= onboarding.flow.length) {
      onboarding.flushData().then(() => {
        router.push('/cases');
      });
    } else {
      router.push(`/onboarding/${onboarding.flow[newProgress].url}`);
    }
  };

  return (
    <>
      <BackLink
        href={
          onboarding && pageProgress > 0
            ? `/onboarding/${onboarding.flow[pageProgress - 1].url}`
            : '/cases'
        }
      >
        Back
      </BackLink>
      <OuterDiv>
        <ProgressBar
          steps={
            new Set(onboarding ? onboarding.flow.slice(1).map(f => f.name) : [])
          }
          progress={pageProgress}
        />
        <FormContainer>
          <FormDiv>
            {children}
            <BigButton
              disabled={
                onboarding &&
                pageProgress >= onboarding.progress &&
                !onboarding.canContinue
              }
              onClick={() => advanceProgress()}
            >
              <H4 $color="white">
                {onboarding && pageProgress === onboarding.flow.length - 1
                  ? 'Continue to Available Cases'
                  : 'Continue'}
              </H4>
            </BigButton>
          </FormDiv>
        </FormContainer>
      </OuterDiv>
    </>
  );
}
