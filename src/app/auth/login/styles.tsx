import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const FormDiv = styled.div`
  display: flex;
  flex-direction:column;
  gap: 2.5rem; // 40 px
  padding: 3.25rem; //52px = 13/4
  border-radius: 10px;
  border: 2px solid ${COLORS.activeBlue};
`;

export const QuestionsDiv = styled.div`
  display: flex;
  flex-direction:column;
  gap: 1.2rem; // 20 px
`;

export const ForgotPassword = styled.p`
  font-size: 14px;
  margin-top: 0.8125rem; //13px
  color: ${COLORS.midDarkGrey};
`;

export const SixteenDiv = styled.div`
  display: flex;
  flex-direction:column;
  gap: 1rem; 
`;