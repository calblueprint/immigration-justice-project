import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { LinkColored } from '../styles/text';

export const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;
export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.blueMid};
  min-height: 290px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
`;
export const FooterSection = styled.div`
  max-width: 316px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;
export const IconDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const FooterLink = styled(LinkColored)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 400px;
`;
