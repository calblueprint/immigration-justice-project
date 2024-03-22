import { H4 } from '@/styles/text';
import { FlowData } from '@/types/misc';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import * as Styles from './styles';

// helper component
function ProgressCircle({
  step,
  idx,
  onboardingURL,
}: {
  step: FlowData;
  idx: number;
  onboardingURL: string;
}) {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: onboarding progress should be placed inside onboarding context provider',
    );

  return (
    <Styles.ProgressCircleContainer
      $disabled={onboarding.progress < idx + 1}
      $active={step.url === onboardingURL}
    >
      <Styles.ProgressCircleCircle
        href={`/onboarding/${onboarding.flow[idx + 1].url}`}
        $clickable={onboarding.progress > idx && onboardingURL !== step.url}
        $filled={onboarding.progress > idx + 1}
        $disabled={onboarding.progress < idx + 1}
        $current={step.url === onboardingURL}
      >
        {idx}
      </Styles.ProgressCircleCircle>
      <H4>{step.name}</H4>
    </Styles.ProgressCircleContainer>
  );
}

// note: progress is 1-indexed
// this means that progress=1 => first circle checked
// progress=0 => progress bar invisible
export default function ProgressBar({
  steps,
  progress,
}: {
  steps: FlowData[];
  progress: number;
}) {
  const pathname = usePathname();

  // get the part after "onboarding/"
  const onboardingURL = pathname.match(/onboarding\/([\w-]+)$/)?.[1] ?? '';

  return (
    <Styles.ProgressBarContainer $show={progress > 0}>
      <Styles.ProgressBarBody>
        {Array.from(steps).map((s, i) => (
          <ProgressCircle
            key={s.url}
            onboardingURL={onboardingURL}
            step={s}
            idx={i}
          />
        ))}
      </Styles.ProgressBarBody>
    </Styles.ProgressBarContainer>
  );
}
