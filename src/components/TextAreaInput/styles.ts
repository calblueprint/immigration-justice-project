import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import styled from 'styled-components';

export const TextArea = styled.textarea`
  ${openSans.style}
  resize: none;
  font-size: 0.875rem;
  font-weight: 400;
  border-radius: 0.3125rem;
  border: 2px solid ${COLORS.greyLight};
  padding: 0.625rem;
  min-height: 5.3125rem;

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
