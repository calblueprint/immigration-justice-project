import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { H4 } from '@/styles/text';

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
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

export const ListingCount = styled(H4)`
  margin-bottom: 0.5rem;
`;

export const CardColumn = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  border-right: 1px solid ${COLORS.greyLight};
  padding: 0 3rem 0 2rem;
  padding-top: 1rem;
  background-color: ${COLORS.background};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background: ${COLORS.greyLight};
  }
`;

export const CaseDetailsContainer = styled.div`
  overflow-y: scroll;
  position: relative;
`;

export const Header = styled.header`
  padding: 0 2rem;
  padding-bottom: 1rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 10fr;
  height: 100%;
  overflow: hidden;
`;

export const ResetFilters = styled.button`
  ${sans.style}

  background: none;
  outline: none;
  border: none;

  font-size: 0.875rem;
  color: ${COLORS.greyMid};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const NoCasesContainer = styled.div`
  position: relative;
  text-align: center;
  top: 35%;
`;
