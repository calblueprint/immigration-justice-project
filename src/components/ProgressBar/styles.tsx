import COLORS from '@/styles/colors';
import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  display: grid;
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
    background: ${COLORS.abaBlue};
    z-index: -10;
  }
`;

export const ProgressCircle = styled.div<{ $checked?: boolean; text: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  border: 0.3125rem solid ${COLORS.abaBlue};
  box-shadow: ${({ $checked }) =>
    $checked
      ? `0 0 0 0.25rem white inset, 0 0 0 100rem ${COLORS.abaBlue} inset`
      : 'none'};

  &::after {
    content: '${({ text }) => text}';
    position: absolute;
    top: 100%;
    color: #818181;
    text-align: center;
  }
`;
