import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

// the card itself
export const CardBody = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 2px solid ${COLORS.greyLight};
  padding: 1rem;
  margin-bottom: 1.563rem; // 25px
  border-radius: 0.313rem; // 5px
  transition: 150ms;
  cursor: pointer;
  gap: 1rem;

  ${({ $selected }) => $selected && `border-color: ${COLORS.blueMid}`};

  &:hover {
    box-shadow: 0 4px 4px 0px ${COLORS.greyLight};
    transform: translateY(-2px);
  }
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.5rem; // 8px
  flex-wrap: wrap;
`;

export const CardTag = styled.span<{ color: string }>`
  ${openSans.style}
  border-radius: 0.188rem; // 3px
  font-size: 0.875rem; // 14px
  color: ${COLORS.greyDarker};
  padding: 0.25rem 0.75rem;
  background: ${({ color }) => color};
`;

export const IconTextGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
