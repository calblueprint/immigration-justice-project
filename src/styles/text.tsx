import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from './colors';

const openSans = OpenSans({ subsets: ['latin'] });

const openSans = OpenSans({ subsets: ['latin'] });

export const H1 = styled.h1<{ $color?: string }>`
  ${openSans.style}
  display: block;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  ${openSans.style}
  color: ${COLORS.titleBlack};
  margin: 0;
`;

export const H3 = styled.h3<{ $color?: string }>`
  ${openSans.style}
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.$color || COLORS.greyDarker};
  margin: 0;
`;

export const H4 = styled.h4<{ $color?: string }>`
  ${openSans.style}
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$color || COLORS.greyDarker};
  margin: 0;
`;

export const H4 = styled.h4`
  color: ${COLORS.existingInputColor};
  ${openSans.style}
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const H4Centered = styled(H4)`
  text-align: center;
`;

export const coloredA = styled.a`
  color: inherit;
`;
