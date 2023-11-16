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
  padding-bottom: 6rem;
`;

export const FormContainer = styled.div`
  display: grid;
  place-items: center;
  flex-grow: 2;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; // 40 px
  padding: 3.125rem;
  border-radius: 0.625rem;
  border: 2px solid ${COLORS.blueMid};
  width: 580px;
`;