import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 65%;
  float: right;
  margin-top: 1rem;
  gap: 0.5rem;
  height: 50%;
`;

export const FormTextArea = styled.textarea`
  height: 16vh;
  resize: none;
  border-radius: 5px;
  border: 1px solid var(--mid-grey, #ccc);
  padding: 0.5rem;
`;

export const FormInput = styled.input`
  border-radius: 5px;
  border: 1px solid var(--mid-grey, #ccc);
  padding: 0.5rem;
  margin-bottom: 0.6rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6rem;
  gap: 4rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  font-size: 14px;
`;

export const RadioInput = styled.input`
  display: flex;
  margin-right: 0.5rem;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid ${COLORS.blueMid};
  border-radius: 50%;
  position: relative; /* Added to establish a positioning context */
  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 0.73rem;
    height: 0.73rem;
    margin-left: 0.08rem;
    margin-top: 0.08rem;
    position: absolute; /* Position absolutely within the radio input */
  }
  &:checked {
    &:after {
      background-color: ${COLORS.blueMid};
    }
  }
`;
