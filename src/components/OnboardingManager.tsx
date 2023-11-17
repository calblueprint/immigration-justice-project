'use client';

import {
  BackLink,
  FormDiv,
  OuterDiv,
  FormContainer,
} from '@/app/onboarding/styles';
import { P } from '@/styles/text';
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
    if (!onboarding) return 0;
    const find = onboarding.flow.findIndex(
      f => `/onboarding/${f.url}` === pathname,
    );
    return find !== -1 ? find : 0;
  }, [pathname, onboarding]);

  useEffect(() => {
    if (!onboarding) return;

    // out of bounds redirect
    if (
      onboarding.progress < 0 ||
      onboarding.progress >= onboarding.flow.length
    ) {
      router.push('/cases');
      return;
    }

    // url not in flow
    if (pageProgress === -1) {
      router.replace(`/onboarding/${onboarding.flow[0].url}`);
      onboarding.setProgress(0);
      return;
    }

    // page visited before
    if (pageProgress <= onboarding.progress) {
      return;
    }

    // course correct
    const correctURL = `/onboarding/${
      onboarding.flow[onboarding.progress].url
    }`;

    if (pathname !== correctURL) {
      router.replace(correctURL);
    }
  }, [onboarding, pathname, router, pageProgress]);

  const advanceProgress = () => {
    if (!onboarding) return;
    const newProgress = pageProgress + 1;

    if (newProgress > onboarding.progress) onboarding.setProgress(newProgress);

    if (newProgress >= onboarding.flow.length) router.push('/cases');
    else router.push(`/onboarding/${onboarding.flow[newProgress].url}`);
  };

  return (
    <div>
      <BackLink
        href={
          onboarding && pageProgress > 0
            ? `/onboarding/${onboarding.flow[pageProgress - 1].url}`
            : '/cases'
        }
      >
        <P>Back</P>
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
              disabled={onboarding && onboarding.canContinue}
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
    </div>
  );
}

/**
 * EXAMPLE USAGE
 * - Make sure there are pages in the onboarding folder
 * - Set their corresponding flows (somehow) to onboarding context
 * - Navigate to /onboarding
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
