import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';
import { LinkColored } from '@/styles/text';

export const NavBarContainer = styled.div`
  /* top: 0;
  left: 0;
  position: absolute; */
  width: 100%;
  height: 78px;
  background: ${COLORS.blueMid};
  align-items: center;
  z-index: 1000;
  width: 100%;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
`;
export const NavBarDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0px;
  justify-items: flex-start;
  align-items: center;
`;
export const IconLink = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  margin-left: 34px;
  margin-right: 34px;
  text-decoration: none;
`;
export const AuthButtons = styled.div`
  display: flex;
  gap: 1.5625rem;
  align-self: center;
  top: 0;
  right: 0;
  margin-right: 3.375rem;
`;
export const NoUnderlineLink = styled(LinkColored)`
  ${sans.style}
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
