import styled from 'styled-components';

// containers
export const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;

  & > a {
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MainDisplay = styled.main`
  display: grid;
  grid-template-columns: 5fr 10fr;
  margin-top: 2rem;
  width: 100%;
`;

// cards
export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid black;
  padding-top: 3px;
  padding-right: 2rem;
`;

// case detail
export const CaseDetailDisplay = styled.aside`
  position: relative;
  width: 100%;
`;
