import styled from 'styled-components';
import { Inter } from 'next/font/google';
import COLORS from '../../styles/colors';

const inter = Inter({ subsets: ['latin'] });

export const InputText = styled.input<{ $error: boolean }>`
  color: ${COLORS.existingInputColor};
  font-size: 1rem; // 16px 
  font-family:  ${inter.style};
  font-weight: 400;
  line-height: 19.20px;
  word-wrap: break-word; 
  padding: 10px 20px 10px 20px;
  border-radius: 5px; 
  border: 1px;
  justify-content: flex-start;
  align-items: flex-start; 
  gap: 10px; 

  color: ${({$error}) => ($error ? COLORS.errorColor : COLORS.existingInputColor)};

  &:focus {
    border-color: ${COLORS.activeGreen};
  }
  &::placeholder {
    color: ${COLORS.inputSuggestionColor};
  }
`
export const InputTitleText = styled.label`
  color: #555555;
  font-size: 1.5rem; // 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 28.80px;
  word-wrap: break-word
`