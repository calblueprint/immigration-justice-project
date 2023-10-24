import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from './colors';

const openSans = OpenSans({ subsets: ['latin'] });

export const H1 = styled.h1`
  display: block;
  font-family: Open Sans;
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
