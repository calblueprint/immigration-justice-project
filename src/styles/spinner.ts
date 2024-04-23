import styled, { keyframes } from 'styled-components';
import COLORS from './colors';

const spinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// $size - controls width and height
// $primary - color of the spinning arc
// $secondary - color of the full circle background
interface SpinnerProps {
  $size?: string;
  $primary?: string;
  $secondary?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  border-radius: 99999px;
  width: ${({ $size }) => $size || '1rem'};
  height: ${({ $size }) => $size || '1rem'};
  border: 2px solid ${({ $secondary }) => $secondary || COLORS.greyDark};
  border-top-color: ${({ $primary }) => $primary || COLORS.greyLighter};
  animation: ${spinKeyframes} 1s linear infinite;
`;
