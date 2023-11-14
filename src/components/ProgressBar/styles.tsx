import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';
import styled from 'styled-components';

export const ProgressBarContainer = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 2.5rem;
  left: 0;
  display: ${({ $show }) => ($show ? 'grid' : 'none')};
  place-items: center;
  width: 100%;
`;

export const ProgressBarBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12.5rem;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0.3125rem;
    transform: translateY(-0.1563rem);
    background: ${COLORS.blueMid};
    z-index: -10;
  }
`;

const ProgressCircleDiv = styled.div<{ $checked?: boolean }>`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background: white;
  border: 0.3125rem solid ${COLORS.blueMid};
  box-shadow: ${({ $checked }) =>
    $checked
      ? `0 0 0 0.3125rem white inset, 0 0 0 100rem ${COLORS.blueMid} inset`
      : 'none'};
  position: relative;

  & > ${H4} {
    position: absolute;
    width: max-content;
    left: 50%;
    transform: translate(-50%, 225%);
    color: ${COLORS.greyMid};
    text-align: center;
  }
`;

export function ProgressCircle({
  checked = false,
  text,
}: {
  checked?: boolean;
  text: string;
}) {
  return (
    <ProgressCircleDiv $checked={checked}>
      <H4>{text}</H4>
    </ProgressCircleDiv>
  );
}
