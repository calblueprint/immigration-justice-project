import styled from 'styled-components';

// styled components
export const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  text-align: left;
  margin: 0;
  margin-right: auto;
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
  padding-right: 2rem;
`;
