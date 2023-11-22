import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';

const openSans = OpenSans({ subsets: ['latin'] });

const getBorderColor = (error: boolean, filled: boolean): string => {
  if (error) {
    return COLORS.redMid;
  }
  if (filled) {
    return COLORS.greyMid;
  }
  return COLORS.greyLight;
};

export const InputLabel = styled(H4)`
  color: ${COLORS.greyDark};
  margin-bottom: 0.625rem; //10px
`;

export const InputDate = styled.input<{ $error: boolean; $filled: boolean }>`
  ${openSans.style}
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.313rem; // 5px
  border: 2px solid ${({ $error, $filled }) => getBorderColor($error, $filled)};
  padding: 0.625rem 1.25rem; // 10px 20px 10px 20px;
  text-transform: uppercase;
  &:focus {
    border-color: ${COLORS.blueMid};
    outline: none;
  }
`;

export const ErrorText = styled.p`
  color: ${COLORS.redMid};
  font-size: 0.875rem; // 14px
  font-weight: 400;
  margin-top: 0.625rem; // 10px
  ${openSans.style}
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
