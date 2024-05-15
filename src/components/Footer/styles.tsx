import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { LinkColored } from '@/styles/text';

export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.blueMid};
  min-height: 290px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
`;

export const FooterSection = styled.div`
  display: flex;
  width: 16rem;
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
  font-size: 0.9375rem;
  font-weight: 400px;
`;
export const Header = styled.p`
  ${sans.style}
  font-size: 1.25rem;
  color: white;
  font-weight: 600;
`;
