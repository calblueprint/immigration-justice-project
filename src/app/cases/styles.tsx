import styled from 'styled-components';

// styled components
export const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
`;

export const MainDisplay = styled.main`
  display: grid;
  grid-template-columns: 5fr 10fr;
  margin-top: 2rem;
  width: 100%;
`;

export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid black;
  padding-top: 0.5rem;
  padding-right: 2rem;
  overflow-y: scroll;
  max-height: 80vh;
`;
