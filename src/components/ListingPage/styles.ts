import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { H4 } from '@/styles/text';
import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  height: 100svh;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* customize scrollbar for listing pages only */
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    position: relative;
    width: 100%;
    background: rgba(204, 204, 204, 0.75);
    border: 5px solid white;
    border-radius: 20px;

    &:hover {
      border: 4px solid white;
      background: rgba(204, 204, 204, 0.9);
    }
  }
`;

export const ListingCount = styled(H4)`
  margin-bottom: 0.5rem;
`;

export const CardColumnWrapper = styled.div`
  height: 100%;
  width: clamp(400px, 33vw, 500px);
  border-right: 1px solid ${COLORS.greyLight};
  background-color: ${COLORS.background};

  ::-webkit-scrollbar-thumb {
    border: 5px solid ${COLORS.background};

    &:hover {
      border: 4px solid ${COLORS.background};
    }
  }
`;

export const CardColumn = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 16px 48px 0 32px;
  height: 100%;
`;

export const ListingDetailsContainer = styled.div`
  overflow-y: scroll;
  position: relative;
  padding: 40px 48px 28px 48px;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background: white;
`;

export const Header = styled.header`
  padding: 20px 30px;
  border-bottom: 1px solid ${COLORS.greyLight};
  z-index: 10;
`;

export const ListingDisplay = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
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

export const NoListingsContainer = styled.div`
  position: relative;
  text-align: center;
  top: 35%;
`;
