import styled from 'styled-components';
import COLORS from '@/styles/colors';

// containers
export const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;
`;

export const MainDisplay = styled.main`
  display: grid;
  grid-template-columns: 4.5fr 10fr;
  margin-top: 2rem;
  width: 100%;
`;

// cards
export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid ${COLORS.greyLight};
  padding-top: 3px;
  padding-right: 3rem;
  overflow-y: scroll;
`;

// case detail
export const CaseDetailDisplay = styled.aside`
  position: relative;
  width: 100%;
`;

export const Header = styled.div`
  position: fixed;
`;
