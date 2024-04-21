import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import styled from 'styled-components';

const getBorderColor = (error: string, filled: boolean): string => {
  if (error !== '') return COLORS.redMid;
  return filled ? COLORS.greyMid : COLORS.greyLight;
};

export const InputDate = styled.input<{ $error: string; $filled: boolean }>`
  ${openSans.style}
  font-size: 0.875rem; //14px
  font-weight: 400;
  cursor: text;
  color: ${({ $filled }) =>
    $filled ? COLORS.greyDarker : COLORS.placeholderText};
  border-radius: 0.313rem; // 5px
  border: 2px solid ${({ $error, $filled }) => getBorderColor($error, $filled)};
  padding: 0.625rem;
  text-transform: uppercase;
  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }
`;
