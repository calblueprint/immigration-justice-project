import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { H4, P } from '@/styles/text';

export const InputText = styled(P)<{ $error: boolean }>`
  ${sans.style}
  color: ${COLORS.greyDarker};
  padding: 10px;
  border-radius: 5px;
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
    border-color: ${COLORS.blueMid};
  }

  ${({ $error }) =>
    $error ? `border-color: ${COLORS.redMid} !important` : null};
`;

export const InputLabel = styled(H4)`
  color: ${COLORS.greyDark};
  margin-bottom: 10px;
`;

export const ErrorText = styled(P)`
  color: ${COLORS.redMid};
  margin-top: 10px;
  ${sans.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;
