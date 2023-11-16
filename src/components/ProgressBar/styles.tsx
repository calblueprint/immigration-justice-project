import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';
import styled from 'styled-components';

export const ProgressBarContainer = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'grid' : 'none')};
  place-items: center;
  width: 100%;
  padding-bottom: 1.8125rem;
`;

export const ProgressBarBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10rem;

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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  border: 0.25rem solid ${COLORS.blueMid};
  box-shadow: ${({ $checked }) =>
    $checked
      ? `0 0 0 0.25rem white inset, 0 0 0 100rem ${COLORS.blueMid} inset`
      : 'none'};
  position: relative;

  & > ${H4} {
    position: absolute;
    width: max-content;
    left: 50%;
    transform: translate(-50%, 175%);
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
