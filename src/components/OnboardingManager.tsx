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
import { ReactNode, useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (!onboarding) {
      console.info('No onboarding');
      return;
    }

    // out of bounds redirect
    if (
      onboarding.progress < 0 ||
      onboarding.progress >= onboarding.flow.length
    ) {
      router.push('/cases');
      return;
    }

    // course correct
    const correctURL = `/onboarding/${
      onboarding.flow[onboarding.progress].url
    }`;

    if (pathname !== correctURL) {
      console.info('Replacing URL...');
      router.replace(correctURL);
    }
  }, [onboarding, pathname, router]);

  const moveProgress = (amount: number) => {
    if (!onboarding) return;
    const newProgress = onboarding.progress + amount;
    onboarding.setProgress(newProgress);
  };

  return (
    <div>
      <BackLink href="" onClick={() => moveProgress(-1)}>
        <P>Back</P>
      </BackLink>
      <OuterDiv>
        <ProgressBar
          steps={
            new Set(onboarding ? onboarding.flow.slice(1).map(f => f.name) : [])
          }
          progress={onboarding ? onboarding.progress : 0}
        />
        <FormContainer>
          <FormDiv>
            {children}
            <BigButton
              disabled={onboarding && onboarding.canContinue}
              onClick={() => moveProgress(1)}
            >
              <P $color="white">
                {onboarding &&
                onboarding.progress === onboarding.flow.length - 1
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
