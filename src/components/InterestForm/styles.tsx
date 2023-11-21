import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';
import { openSans } from '@/styles/fonts';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 61%;
  float: right;
  margin-top: 1rem;
  gap: 0.6rem;
`;

export const FormTitle = styled(H3)`
  margin-bottom: 0.2rem;
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
  padding: 0.5rem;
  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }
`;

export const FormInput = styled.input`
  ${openSans.style}
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.313rem; // 5px
  border: 2px solid ${COLORS.greyLight};
  padding: 0.5rem;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6rem;
  column-gap: 3rem;
  row-gap: 0.4rem;
  flex-wrap: wrap;
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
