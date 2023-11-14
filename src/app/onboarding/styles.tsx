import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
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
