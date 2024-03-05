import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';
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
  /* padding-top: 15px;
  padding-bottom: 15px; */
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
  //position: absolute;
  top: 0;
  right: 0;
  //margin-top: 2.1875rem;
  margin-right: 3.375rem;
`;
export const NoUnderlineLink = styled(LinkColored)`
  ${openSans.style}
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

// export const LinkToPage = styled.a`
// ${openSans.style}
// font-size: 1rem; // 16px
// color: #FFFFFF;
// text-decoration: none;

// &:hover {
//   text-decoration: underline; // Adding a hover effect
// }
// `;

// export const LinkToPage = styled.div`
//   font: ${openSans.style};
//   font-size: 1rem; // 16px;
//   color: #ffffff;
//   text-decoration: underline;
//   font-weight: 500;
//   text-decoration-color: ${COLORS.blueMid};
//   padding-left: 34px;
// `;
