import styled from 'styled-components';
import { H1 } from '@/styles/text';
import COLORS from '@/styles/colors';

// case detail
export const CaseDisplay = styled.aside`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const CaseTitle = styled(H1)`
  margin: 0.4rem 4rem;
`;

export const CaseInterestContainer = styled.div`
  position: sticky;
  top: 4rem;
  width: 95%;
  border-radius: 10px;
  margin-left: 3rem;
  padding: 2rem;
  border: 2px solid ${COLORS.blueMid};
  justify-content: space-between;
  flex-direction: column;
  gap: 1.4rem;
  display: block;
  overflow-y: auto;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50%;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.2rem;
`;

export const Line = styled.hr`
  color: 'black';
`;
