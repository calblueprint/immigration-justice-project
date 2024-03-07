import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 2.5rem;
  padding-bottom: 7.5rem;
`;

export const FormContainer = styled.div`
  display: grid;
  place-items: center;
  flex-grow: 2;
  width: 39.25rem;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; // 40 px
  padding: 3rem;
  border-radius: 0.625rem;
  border: 2px solid ${COLORS.blueMid};
  width: 39.25rem;
  margin: auto;
`;

export const LineDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  width: 100%;
`;
