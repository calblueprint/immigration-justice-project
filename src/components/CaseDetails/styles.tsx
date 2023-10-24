import styled from 'styled-components';
import COLORS from '../../styles/colors';

// case detail
export const CaseDisplay = styled.aside`
  position: relative;
  width: 100%;
`;

export const CaseTitle = styled.h1`
  margin: 0.4rem 4rem;
`;

export const CaseInterestContainer = styled.div`
  position: sticky;
  top: 4rem;
  width: 95%;
  height: 85vh;
  border-radius: 10px;
  margin: 0 auto;
  padding: 2rem;
  border: 2px solid ${COLORS.blueMid};
  justify-content: space-between;
  flex-direction: column;
  gap: 1.4rem;
  display: block;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  gap: 0.5rem;
  padding: 0.2rem;
`;

export const Line = styled.hr`
  color: 'black';
  background-color: 'black';
  border-color: 'black';
`;
