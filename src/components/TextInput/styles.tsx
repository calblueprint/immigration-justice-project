import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';

const openSans = OpenSans({ subsets: ['latin'] });

export const InputText = styled(P)<{ $error: boolean }>`
  // pass in as='input' when using as a tag, since this is supposed to be an input
  color: ${COLORS.greyDarker};
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
  border-radius: 5px;
  border: 2px solid
    ${({ $error }) => ($error ? COLORS.redMid : COLORS.placeholderText)};
  justify-content: flex-start;
  align-items: flex-start;
  outline: none;

  &::placeholder {
    color: ${COLORS.inputSuggestionColor};
  }

  &:not(:placeholder-shown) {
    border-color: ${COLORS.existingInputColor}
  }

  &:focus {
    outline: none !important;
    border: 2px solid
      ${({ $error }) => ($error ? COLORS.errorColor : COLORS.activeBlue)};
  }
`;

export const InputTitleText = styled.label`
  color: ${COLORS.existingInputColor};
  font-size: 1rem; // 16px;
  ${inter.style}
  font-weight: 500;
  line-height: 28.8px;
  word-wrap: break-word;
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
