import styled from 'styled-components';
import { Inter } from 'next/font/google';
import COLORS from '../../styles/colors';

const inter = Inter({ subsets: ['latin'] });

export const InputText = styled.input<{ $error: boolean }>`
  color: ${COLORS.existingInputColor};
  font-size: 1rem; // 16px
  font-family: ${inter.style};
  font-weight: 400;
  line-height: 19.2px; 
  word-wrap: break-word;
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
  border-radius: 5px;
  border: 1px solid
    ${({ $error }) => ($error ? COLORS.errorColor : COLORS.existingInputColor)};
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  color: ${({ $error }) =>
    $error ? COLORS.errorColor : COLORS.existingInputColor};

  &:focus {
    outline: none !important;
    border: 2px solid
      ${({ $error }) => ($error ? COLORS.errorColor : COLORS.activeGreen)};
  }
  &::placeholder {
    color: ${({ $error }) =>
      $error ? COLORS.errorColor : COLORS.inputSuggestionColor};
  }
`;
export const InputTitleText = styled.label`
  color: ${COLORS.existingInputColor};
  font-size: 1.5rem; // 24px;
  font-family: ${inter.style};
  font-weight: 500;
  line-height: 28.8px;
  word-wrap: break-word;
`;
