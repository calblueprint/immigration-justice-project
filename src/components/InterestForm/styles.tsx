import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';
import { openSans } from '@/styles/fonts';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 61%;
  float: right;
  margin-top: 1rem;
  gap: 0.625rem; // 10px
`;

export const FormQuestion = styled(H4)`
  margin-top: 0.375rem;
`;

export const FormTextArea = styled.textarea`
  ${openSans.style}
  min-height: 10rem;
  resize: none;
  font-size: 1rem; // 16px;
  font-weight: 400;
  border-radius: 0.313rem; // 5px
  border: 2px solid ${COLORS.greyLight};
  margin-bottom: 0.6rem;
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
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

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  column-gap: 3rem;
  row-gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.375rem;
`;
export const Radio = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.label`
  display: flex;
  font-size: 0.875rem; //14px
`;

export const RadioInput = styled.input`
  display: grid;
  place-items: center;
  margin-right: 0.4rem;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid ${COLORS.greyMid};
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

export const FormWarning = styled.p`
  padding-bottom: 0.375rem; // 6px
  color: ${COLORS.greyMid};
  font-size: 0.75rem; // 12px
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 50%;
  height: 100%;
`;

export const ErrorText = styled.p`
  color: ${COLORS.redMid};
  font-size: 0.875rem; //14px
  font-weight: 400;
  ${openSans.style}
`;
