import styled from 'styled-components';
import { H1, P } from '@/styles/text';
import COLORS from '@/styles/colors';

export const CaseDisplay = styled.aside`
  position: relative;
  width: 100%;
`;

export const CaseTitle = styled(H1)`
  margin: 0.4rem 4rem;
`;

// export const CaseInterestContainer = styled.div`
//   position: sticky;
//   top: 4rem;
//   width: 100%;
//   border-radius: 10px;
//   padding: 3rem;
//   border: 2px solid ${COLORS.blueMid};
//   justify-content: space-between;
//   flex-direction: column;
//   display: block;
//   overflow-y: auto;
// `;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50%;
  /* gap: 1.35rem;
  padding: 0.2rem; */
`;

export const InnerInfoContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

export const InnerFieldContainer = styled.div`
  gap: 1.25rem;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const FieldContainer = styled.div`
  display: flex;
  gap: 0.188rem;
  flex-direction: column;
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1.5625rem;
  margin-top: 1.25rem;
`;

export const IconTextGroup = styled.div`
  display: flex;
  direction: row;
  gap: 11px;
  align-items: center;
`;

export const BorderedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 55px;
  border: 1px solid ${COLORS.greyLighter};
`;

export const InlineP = styled(P)`
  display: inline;
`;

export const DateText = styled(P)<{ $bold?: true }>`
  display: inline;
  font-size: 1rem;
  font-weight: ${props => (props.$bold ? 500 : 400)};
`;
