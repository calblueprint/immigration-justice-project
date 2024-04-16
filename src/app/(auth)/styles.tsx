import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';

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

export const SpacerDiv = styled.div<{ $gap?: number; $align?: string }>`
  display: flex;
  flex-direction: column;
  ${({ $align }) => $align && `align-items: ${$align};`};
  gap: ${({ $gap }) => $gap || 19.2}px;
`;

export const H4Centered = styled(H4)`
  color: ${COLORS.greyDark};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

export const PCentered = styled(P)`
  color: ${COLORS.greyDark};
  font-size: 1rem;
  text-align: center;
`;

export const AuthHeading = styled.h1`
  color: ${COLORS.blueDarker};
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
`;

export const AuthSubHeading = styled.h2`
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 1.25rem;
`;

export const BackLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  z-index: 10;
  text-decoration: none;

  & > ${P} {
    line-height: 1.2;
    color: ${COLORS.greyDarker};
    border-bottom: 1px solid ${COLORS.greyDarker};
  }

  &::before {
    content: '';
    display: block;
    width: 0.5625rem;
    height: 0.6875rem;
    background-image: url('data:image/svg+xml,%3csvg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cpath d="M0.26416 6.88213C-0.0874023 7.22393 -0.0874023 7.779 0.26416 8.1208L5.66416 13.3708C6.01572 13.7126 6.58666 13.7126 6.93822 13.3708C7.28979 13.029 7.28979 12.4739 6.93822 12.1321L2.17385 7.5001L6.93541 2.86807C7.28697 2.52627 7.28697 1.97119 6.93541 1.62939C6.58385 1.2876 6.01291 1.2876 5.66135 1.62939L0.261348 6.87939L0.26416 6.88213Z" fill="%23292929"/%3e%3c/svg%3e');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1rem 1rem;
  }
`;
