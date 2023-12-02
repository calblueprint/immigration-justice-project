import styled from 'styled-components';
import { H1 } from '@/styles/text';
import COLORS from '@/styles/colors';

export const CaseDisplay = styled.aside`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const CaseTitle = styled(H1)`
  margin: 0.4rem 4rem;
`;

export const CaseInterestContainer = styled.div`
  position: sticky;
  top: 4rem;
  width: 100%;
  border-radius: 10px;
  padding: 3rem;
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
  gap: 1.35rem;
  padding: 0.2rem;
`;

export const InnerInfoContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

export const InnerFieldContainer = styled.div`
  gap: 1.25rem;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const Line = styled.hr`
  color: 'black';
  margin: 1.25rem 0;
`;

export const FieldContainer = styled.div`
  display: flex;
  gap: 0.188rem;
  flex-direction: column;
`;
