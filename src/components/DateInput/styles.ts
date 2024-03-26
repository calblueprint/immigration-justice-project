import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';
import { openSans } from '@/styles/fonts';

export const InputLabel = styled(H4)`
  color: ${COLORS.greyDark};
  margin-bottom: 10px;
`;

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

export const ErrorText = styled.p`
  color: ${COLORS.redMid};
  font-size: 0.875rem; // 14px
  font-weight: 400;
  margin-top: 0.625rem; // 10px
  ${openSans.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
