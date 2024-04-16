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
  width: 100%;
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
  gap: 1.5625rem;
  align-self: center;
  top: 0;
  right: 0;
  margin-right: 3.375rem;
`;
export const NoUnderlineLink = styled(LinkColored)<{ active?: boolean }>`
  ${sans.style}
  text-decoration: none;
  margin: 10px;
  position: relative;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
export const LinkContainer = styled.div<{ active: boolean }>`
  display: flex;
  height: 100%;
  margin: 5px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: ${props => (props.active ? '#0f71ad' : COLORS.blueMid)};
`;
