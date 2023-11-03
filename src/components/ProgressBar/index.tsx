import {
  ProgressBarContainer,
  ProgressBarBody,
  ProgressCircle,
} from './styles';

export default function ProgressBar({
  steps,
  progress,
}: {
  steps: Set<string>;
  progress: number;
}) {
  return (
    <ProgressBarContainer>
      <ProgressBarBody>
        {Array.from(steps).map((s, i) => (
          <ProgressCircle key={s} text={s} checked={i < progress} />
        ))}
      </ProgressBarBody>
    </ProgressBarContainer>
  );
}
