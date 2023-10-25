import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from './colors';

const openSans = OpenSans({ subsets: ['latin'] });

export const H1 = styled.h1`
  display: block;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  ${openSans.style}
  color: ${COLORS.titleBlack};
  margin: 0;
  margin-right: auto;
`;

export const H2 = styled.h2`
  font-size: 1.5rem;
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
