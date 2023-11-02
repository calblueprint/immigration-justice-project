import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from './colors';

const openSans = OpenSans({ subsets: ['latin'] });

// 1 rem = 16 px

export const H1 = styled.h1`
  ${openSans.style}
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: ${COLORS.greyDarker};
  margin: 0;
  margin-right: auto;
`;

export const H2 = styled.h2`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${COLORS.greyDarker};
  margin: 0;
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.greyDarker};
  margin: 0;
`;

export const H4 = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.greyDarker};
`;

export const p = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${COLORS.greyDarker};
`;
