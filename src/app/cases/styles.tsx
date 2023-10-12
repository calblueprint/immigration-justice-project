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

// cards
export const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid black;
  padding-top: 0.5rem;
  padding-right: 2rem;
`;

// case detail
export const CaseDetailDisplay = styled.aside`
  position: relative;
  width: 100%;
`;

export const CaseDetails = styled.div`
  position: sticky;
  top: 4rem;
  background: white;
  width: 90%;
  height: 80vh;
  border-radius: 20px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  border: 1px solid lightgray;
`;
