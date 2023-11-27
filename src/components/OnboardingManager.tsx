'use client';

import { FormDiv, OuterDiv, FormContainer } from '@/app/onboarding/styles';
import { BackLink, P } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useMemo } from 'react';
import ProgressBar from './ProgressBar';
import BigButton from './BigButton';

export default function OnboardingManager({
  children,
}: {
  children: ReactNode;
}) {
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
      onboarding.progress >= onboarding.flow.length
    ) {
      router.push('/cases');
    }

    if (pageProgress > onboarding.progress)
      router.push(`/onboarding/${onboarding.flow[onboarding.progress].url}`);
  }, [onboarding, router, pageProgress]);

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
                pageProgress === onboarding.progress &&
                !onboarding.canContinue
              }
              onClick={() => advanceProgress()}
            >
              <P $color="white">
                {onboarding && pageProgress === onboarding.flow.length - 1
                  ? 'Continue to Available Cases'
                  : 'Continue'}
              </P>
            </BigButton>
          </FormDiv>
        </FormContainer>
      </OuterDiv>
    </>
  );
}

/**
 * EXAMPLE USAGE
 * - Make sure there are pages in the onboarding folder
 * - Set their corresponding flows in onboarding context (line 64)
 * - Navigate to a valid page in /onboarding/...
 */

/**
 * IMPORTANT: Make 3 of such pages:
 * 
 * app/onboarding/<PAGE_NAME>/page.tsx
 * 

import React from 'react';

export default function page() {
  return <>EXAMPLE TEXT</>;
}

*/
