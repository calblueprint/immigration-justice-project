import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4 } from '@/styles/text';

export const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 3rem;
  border-radius: 0.625rem;
  border: 2px solid ${COLORS.blueMid};
  width: 39.25rem;
`;

export const QuestionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem; // 20 px
`;

export const SpacerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const H4Centered = styled(H4)`
  color: ${COLORS.greyDark};
  text-align: center;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 1.25rem;
`;
