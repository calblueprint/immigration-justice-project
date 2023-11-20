import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
`;

export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr;
  padding: 1rem 2rem 0rem 2rem;
  overflow: hidden;
`;

export const CardColumn = styled.div`
  overflow-y: scroll;
  flex-direction: column;
  column-gap: 2rem;
  justify-content: space-between;
  border-right: 1px solid ${COLORS.greyLight};
  margin-top: 1.5rem;
  padding: 0.5rem 3rem 0rem 0rem;
`;

export const CaseDetailsContainer = styled.div`
  overflow-y: scroll;
  padding: 0.5rem 1.25rem 0rem 0rem;
  column-gap: 2rem;
  margin-top: 1.5rem;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 10fr;
  overflow: hidden;
`;
