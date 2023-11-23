import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.625rem;
  border: 1px solid ${COLORS.blueMid};
  padding: 3rem;
  gap: 2.5rem;
`;

export const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const KeyValueBlurb = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
