import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from '@/styles/colors';

const openSans = OpenSans({ subsets: ['latin'] });

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; // 40 px
  padding: 3.25rem; //52px = 13/4
  border-radius: 0.625rem;
  border: 2px solid ${COLORS.activeBlue};
`;

export const ForgotPassword = styled.p`
  color: ${COLORS.midDarkGrey};
  ${openSans.style}
  font-size: 0.875rem; // 14px;
  font-weight: 400;
`;

export const QuestionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem; // 20 px
`;

export const SixteenDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
