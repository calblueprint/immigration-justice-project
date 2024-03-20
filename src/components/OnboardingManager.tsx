'use client';

import { FormContainer, FormDiv, OuterDiv } from '@/app/onboarding/styles';
import CONFIG from '@/lib/configs';
import { BackLink, H4 } from '@/styles/text';
import { AuthContext } from '@/utils/AuthProvider';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { ProfileContext } from '@/utils/ProfileProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import BigButton from './BigButton';
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
        router.push(CONFIG.homepage);
      });
    } else {
      router.push(`/onboarding/${onboarding.flow[newProgress].url}`);
    }
  };

  return (
    <>
      {/* replace with navbar */}
      <BackLink
        href={
          onboarding && pageProgress > 0
            ? `/onboarding/${onboarding.flow[pageProgress - 1].url}`
            : CONFIG.homepage
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
