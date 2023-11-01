import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Open_Sans as OpenSans } from 'next/font/google';
import { H4 } from '@/styles/text';

const openSans = OpenSans({ subsets: ['latin'] });

// the card itself
export const CardBody = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 2px solid ${COLORS.greyLight};
  padding: 1rem;
  border-radius: 5px;
  transition: 150ms;
  cursor: pointer;
  gap: 1rem;

  ${({ $selected }) => $selected && `border-color: ${COLORS.blueMid}`};

  &:hover {
    box-shadow: 0 4px 4px 0px ${COLORS.greyLight};
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled(H4)`
  color: ${COLORS.greyDarker};
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.5rem; // 8px
  flex-wrap: wrap;
`;

export const CardTag = styled.span<{ color: string }>`
  ${openSans.style}
  border-radius: 3px;
  font-size: 0.875rem; // 14px
  color: ${COLORS.greyDarker};
  padding: 0.25rem 0.75rem;
  background: ${({ color }) => color};
`;
