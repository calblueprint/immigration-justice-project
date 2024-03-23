import { H4 } from '@/styles/text';
import { FlowData } from '@/types/misc';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext } from 'react';
import * as Styles from './styles';

// helper component
function ProgressCircle({
  step,
  idx,
  progress,
}: {
  step: FlowData;
  idx: number;
  progress: number;
}) {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: onboarding progress should be placed inside onboarding context provider',
    );

  return (
    <Styles.ProgressCircleContainer
      $disabled={onboarding.progress < idx}
      $active={idx === progress}
    >
      <Styles.ProgressCircleCircle
        href={`/onboarding/${onboarding.flow[idx].url}`}
        $clickable={onboarding.progress > idx - 1 && idx !== progress}
        $filled={onboarding.progress > idx}
        $disabled={onboarding.progress < idx}
        $current={idx === progress}
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
  return (
    <Styles.ProgressBarContainer $show={progress > 0}>
      <Styles.ProgressBarBody>
        {Array.from(steps).map((s, i) => (
          <ProgressCircle
            key={s.url}
            progress={progress}
            step={s}
            idx={i + 1}
          />
        ))}
      </Styles.ProgressBarBody>
    </Styles.ProgressBarContainer>
  );
}
