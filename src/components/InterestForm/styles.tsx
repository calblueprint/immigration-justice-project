import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 60%;
  float: right;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const FormTextArea = styled.textarea`
  height: 16vh;
  resize: none;
  border-radius: 5px;
  border: 1px solid var(--mid-grey, #ccc);
  margin-bottom: 0.6rem;
  padding: 0.5rem;
  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }
`;

export const FormInput = styled.input`
  border-radius: 5px;
  border: 1px solid var(--mid-grey, #ccc);
  padding: 0.5rem;
  margin-bottom: 0.6rem;
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
  font-size: 14px;
`;

export const RadioInput = styled.input`
  display: grid;
  place-items: center;
  margin-right: 0.4rem;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid ${COLORS.blueMid};
  border-radius: 50%;
  position: relative;

  &:checked {
    box-shadow: 0 0 0 0.1rem white inset, 0 0 0 0.5rem ${COLORS.blueMid} inset;
  }
`;
