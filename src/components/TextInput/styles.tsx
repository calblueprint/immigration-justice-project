import styled from 'styled-components';
import { Inter } from 'next/font/google';
import COLORS from '../../styles/colors';

const inter = Inter({ subsets: ['latin'] });

export const InputText = styled.input<{ $error: boolean }>`
  color: ${COLORS.dark};
  font-size: 1rem; // 16px
  ${inter.style}
  font-weight: 400;
  line-height: 19.2px;
  word-wrap: break-word;
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
  border-radius: 5px;
  border: 2px solid
    ${({ $error }) =>
      $error ? COLORS.primaryError : COLORS.placeholderText};
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.dark};

  &:focus {
    outline: none !important;
    border: 2px solid
      ${({ $error }) => ($error ? COLORS.primaryError : COLORS.primaryBlue)};
  }

  &::placeholder {
    color: ${COLORS.placeholderText};
  }
`;

export const InputTitleText = styled.label`
  color: ${COLORS.dark};
  font-size: 1.5rem; // 24px;
  ${inter.style}
  font-weight: 500;
  line-height: 28.8px;
  word-wrap: break-word;
  margin-bottom: 1.2rem;
`;

export const ErrorText = styled.p`
  color: ${COLORS.primaryError};
  margin-top: 0.625rem;
  font-size: 0.875rem; //14px
  font-weight: 400;
  ${inter.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
