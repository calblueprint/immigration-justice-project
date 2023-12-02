import styled from 'styled-components';
import { openSans } from '@/styles/fonts';
import COLORS from '@/styles/colors';

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.625rem;
`;

export const TextArea = styled.textarea`
  ${openSans.style}
  font-size: 0.875rem;
  resize: none;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.3125rem;
  border: 2px solid ${COLORS.greyLight};
  padding: 0.625rem;
  min-height: 10rem;

  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }

  &::placeholder {
    color: ${COLORS.placeholderText};
  }

  &:not(:placeholder-shown) {
    border-color: ${COLORS.greyMid};
  }
`;
