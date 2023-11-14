import {
  ProgressBarContainer,
  ProgressBarBody,
  ProgressCircle,
} from './styles';

export default function ProgressBar({
  show = true,
  steps,
  progress,
}: {
  show?: boolean;
  steps: Set<string>;
  progress: number;
}) {
  return (
    <ProgressBarContainer $show={show}>
      <ProgressBarBody>
        {Array.from(steps).map((s, i) => (
          <ProgressCircle key={s} text={s} checked={i < progress} />
        ))}
      </ProgressBarBody>
    </ProgressBarContainer>
  );
}
