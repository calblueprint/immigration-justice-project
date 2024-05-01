import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { LinkColored } from '@/styles/text';

export const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 78px;
  background: ${COLORS.blueMid};
  z-index: 1000;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`;

export const NavBarSectionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  margin-left: 34px;
  margin-right: 34px;
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;
  top: 0;
  right: 0;
`;
export const NoUnderlineLink = styled(LinkColored)<{ isactive: boolean }>`
  ${sans.style}
  text-decoration: none;
  margin: 10px;
  font-weight: ${props => (props.isactive ? '600' : '400')};
  cursor: pointer;
`;

export const ActiveUnderline = styled.hr<{ $isActive: boolean }>`
  opacity: ${props => (props.$isActive ? 1 : 0)};
  visibility: ${props => (props.$isActive ? 'visible' : 'hidden')};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: white;
  border: none;
  margin: 0;
  margin-bottom: 4px;
`;

export const LinkContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  margin: 5px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
