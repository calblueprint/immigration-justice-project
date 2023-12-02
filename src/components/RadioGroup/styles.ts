import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
import styled from 'styled-components';

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const GroupContainer = styled.div`
  display: flex;
  gap: 3.75rem;
  width: 100%;
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

export const RadioLabel = styled.label`
  ${openSans}
  font-size: .875rem;
  color: ${COLORS.greyDarker};
  display: flex;
  gap: 0.625rem;
  align-items: center;
`;
