import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const AuthButtons = styled.div`
  display: flex;
  gap: 1.5625rem;

  position: absolute;
  top: 0;
  right: 0;
  margin-top: 2.1875rem;
  margin-right: 3.375rem;
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

export const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr;
  padding-top: 1rem;
  overflow: hidden;
`;

export const CardColumn = styled.div`
  overflow-y: auto;
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

export const Header = styled.header`
  padding: 0 2rem;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 10fr;
  overflow: hidden;
  padding: 0 2rem;
`;
