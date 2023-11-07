import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import { P, H4 } from '@/styles/text';
import COLORS from '@/styles/colors';

const openSans = OpenSans({ subsets: ['latin'] });

export const InputText = styled(P)<{ $error: boolean }>`
  // is possible to inherit text styles from H4?
  ${openSans.style}
  color: ${COLORS.greyDarker};
  
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
  border-radius: 5px;
  border: 2px solid
    ${({ $error }) => ($error ? COLORS.redMid : COLORS.placeholderText)};
  justify-content: flex-start;
  align-items: flex-start;
  outline: none;

  &::placeholder {
    color: ${COLORS.placeholderText};
  }

  &:not(:placeholder-shown) {
    border-color: ${COLORS.greyDarker};
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

export const ErrorText = styled.p`
  color: ${COLORS.redMid};
  margin-top: 0.625rem;
  font-size: 0.875rem; //14px
  font-weight: 400;
  ${openSans.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;