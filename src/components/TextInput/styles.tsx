import styled from 'styled-components';
import { P, H4 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

export const InputText = styled(P)<{ $error: boolean }>`
  ${openSans.style}
  color: ${COLORS.greyDarker};

  padding: 0.625rem 1.25rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid
    ${({ $error }) => ($error ? COLORS.redMid : COLORS.greyLight)};
  justify-content: flex-start;
  align-items: flex-start;
  outline: none;

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
`;
