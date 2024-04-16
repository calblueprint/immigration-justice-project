import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { P } from '@/styles/text';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 61%;
  float: right;
  gap: 0.625rem; // 10px
  margin-left: auto;
`;

export const FormTextArea = styled.textarea`
  ${sans.style}
  font-size: 0.875rem; //14px
  min-height: 5.3125rem;
  resize: none;
  font-size: 0.875rem;
  font-weight: 400;
  border-radius: 0.313rem; // 5px
  border: 2px solid ${COLORS.greyLight};
  margin-bottom: 0.6rem;
  padding: 0.625rem;
  outline: none;
  &::placeholder {
    color: ${COLORS.placeholderText};
  }
  &:not(:placeholder-shown) {
    border-color: ${COLORS.greyDarker};
  }
  &:focus {
    border-color: ${COLORS.blueMid};
  }
`;

export const Radio = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.label`
  display: flex;
  font-size: 0.875rem; //14px
  font-weight: 400;
  color: ${COLORS.greyDarker};
`;

export const RadioInput = styled.input`
  display: grid;
  place-items: center;
  margin-right: 0.4rem;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1.5px solid ${COLORS.greyMid};
  border-radius: 50%;
  position: relative;

  &:checked {
    box-shadow: 0 0 0 0.1rem white inset, 0 0 0 0.5rem ${COLORS.blueMid} inset;
    border-color: ${COLORS.blueMid};
  }
  &:hover {
    border-color: ${COLORS.blueMid};
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

export const FormWarning = styled(P)`
  padding-bottom: 0.375rem; // 6px
  color: ${COLORS.greyMid};
  font-size: 0.75rem; // 12px
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 50%;
  height: 100%;
`;

export const EmptySpace = styled.div`
  padding-bottom: 200px;
`;
