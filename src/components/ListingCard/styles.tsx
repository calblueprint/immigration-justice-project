import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

// the card itself
export const CardBody = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  transition: 150ms;
  cursor: pointer;
  gap: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  margin-bottom: 24px;

  ${({ $selected }) =>
    $selected
      ? `border-color: ${COLORS.blueMid};`
      : `
    &:hover {
      box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.15);
    }
  `};
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.5rem; // 8px
  flex-wrap: wrap;
`;

export const CardTag = styled.span<{ color: string }>`
  ${openSans.style}
  border-radius: 200px;
  font-size: 0.875rem; // 14px
  color: ${COLORS.greyDarker};
  padding: 0.25rem 0.75rem;
  background: ${({ color }) => color};
`;

export const IconTextGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
