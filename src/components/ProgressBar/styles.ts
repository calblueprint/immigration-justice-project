import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';

export const ProgressBarContainer = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'grid' : 'none')};
  place-items: center;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 80px;
`;

export const ProgressBarBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 160px;
`;

export const ProgressCircleContainer = styled.div<{
  $active?: boolean;
  $disabled?: boolean;
}>`
  width: 40px;
  height: 40px;
  background: white;
  position: relative;

  &:not(:first-child)::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: -160px;
    right: 0;
    bottom: 0;
    transform: translateY(-50%);
    width: 160px;
    height: 4px;
    border: 0;
    background-color: ${({ $disabled }) =>
      $disabled ? COLORS.greyMid : COLORS.blueMid};
    z-index: -10;
  }

  & > ${H4} {
    position: absolute;
    width: max-content;
    left: 50%;
    transform: translate(-50%, 2px);
    color: ${({ $active }) => ($active ? COLORS.blueMid : COLORS.greyMid)};
    text-align: center;
  }
`;

export const ProgressBubble = styled.div<{
  $filled?: boolean;
  $disabled?: boolean;
  $current?: boolean;
  $clickable?: boolean;
}>`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 4px solid ${COLORS.blueMid};
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${COLORS.blueMid};

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:active {
    color: ${COLORS.blueMid};
  }

  ${({ $filled }) =>
    $filled &&
    `
    color: white;
    background: ${COLORS.blueMid};

    &:active {
      color: white;
    }
  `}

  ${({ $disabled }) =>
    $disabled &&
    `
    border-color: ${COLORS.greyMid};
    color: ${COLORS.greyMid};

    &:active {
      color: ${COLORS.greyMid};
    }
  `}
`;
