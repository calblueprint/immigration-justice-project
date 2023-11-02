import {
  ProgressBarContainer,
  ProgressBarBody,
  ProgressCircle,
} from './styles';

export default function ProgressBar() {
  return (
    <ProgressBarContainer>
      <ProgressBarBody>
        <ProgressCircle text="Test" $checked />
        <ProgressCircle text="Test" />
        <ProgressCircle text="Test" />
      </ProgressBarBody>
    </ProgressBarContainer>
  );
}
