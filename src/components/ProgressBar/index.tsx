import {
  ProgressBarBody,
  ProgressBarContainer,
  ProgressCircle,
} from './styles';

// note: progress is 1-indexed
// this means that progress=1 => first circle checked
// progress=0 => progress bar invisible
export default function ProgressBar({
  steps,
  progress,
}: {
  steps: Set<string>;
  progress: number;
}) {
  return (
    <ProgressBarContainer $show={progress > 0}>
      <ProgressBarBody>
        {Array.from(steps).map((s, i) => (
          <ProgressCircle key={s} text={s} checked={i < progress} />
        ))}
      </ProgressBarBody>
    </ProgressBarContainer>
  );
}
