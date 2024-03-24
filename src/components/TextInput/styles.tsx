import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import { H4, P } from '@/styles/text';
import styled from 'styled-components';

export const InputText = styled(P)<{ $error: boolean }>`
  ${openSans.style}
  color: ${COLORS.greyDarker};
  padding: 0.625rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid ${COLORS.greyLight};
  outline: none;
  width: 100%;

  &::placeholder {
    color: ${COLORS.placeholderText};
  }

  &:not(:placeholder-shown) {
    border-color: ${COLORS.greyMid};
  }

  &:focus {
    border: 2px solid
      ${({ $error }) => ($error ? COLORS.redMid : COLORS.blueMid)};
  }

  ${({ $error }) =>
    $error ? `border-color: ${COLORS.redMid} !important` : null};
`;

export const InputLabel = styled(H4)`
  color: ${COLORS.greyDark};
  margin-bottom: 0.625rem; //10px
`;

export const ErrorText = styled(P)`
  color: ${COLORS.redMid};
  margin-top: 0.625rem;
  ${openSans.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;
