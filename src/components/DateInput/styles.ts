import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import styled from 'styled-components';

export const InputDate = styled.input<{ $error: boolean; $filled: boolean }>`
  ${openSans.style}
  font-size: 0.875rem; // 14px
  font-weight: 400;
  cursor: text;
  border-radius: 5px;
  color: ${COLORS.placeholderText};
  border: 2px solid ${COLORS.greyLight};
  padding: 0.625rem;
  text-transform: uppercase;

  ${({ $filled }) =>
    $filled
      ? `color: ${COLORS.greyDarker};
    border-color: ${COLORS.greyMid};`
      : null}

  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }

  ${({ $error }) =>
    $error ? `border-color: ${COLORS.redMid} !important` : null};
`;
