import Link from 'next/link';
import styled, { css } from 'styled-components';
import COLORS from './colors';
import { sans } from './fonts';

// 1 rem = 16 px
interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: 'left' | 'right' | 'center' | 'end' | 'justify' | 'start';
}

const TextStyles = css<TextProps>`
  ${sans.style}
  font-weight: ${({ $fontWeight }) => $fontWeight || '600'};
  color: ${({ $color }) => $color || COLORS.greyDarker};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  display: block;
  font-size: 3rem;
`;

export const H1Centered = styled(H1)`
  text-align: center;
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-size: 2.25rem;
`;

export const H2Centered = styled(H2)`
  text-align: center;
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  font-size: 1.25rem;
`;

export const CenteredH3 = styled(H3)`
  align-self: center;
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-size: 1rem;
`;

export const P = styled.p<TextProps>`
  ${TextStyles}
  font-size: .9375rem;
  font-weight: 400;
`;

export const StrongP = styled(P)`
  font-weight: 700;
`;

export const MediumSpan = styled.span<TextProps>`
  font-weight: 500;
`;

interface LabelProps extends TextProps {
  $required?: boolean;
}

export const InputLabel = styled(H4)<LabelProps>`
  color: ${({ $color }) => $color || COLORS.greyDark};
  ${({ $required }) =>
    $required &&
    `&::after {
      content: ' *';
      color: ${COLORS.redMid};
    }`};
`;

export const LinkColored = styled(Link)<TextProps>`
  ${TextStyles}
  font-weight: 400;
`;

export const BackLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  gap: 0.625rem;

  outline: none;
  margin: 2.5rem;
  margin-left: 3.6875rem;
  border-bottom: 1px solid transparent;

  color: ${COLORS.greyDarker};
  text-decoration: none;
  line-height: 1.2;

  cursor: pointer;
  z-index: 10;

  &:hover,
  &:focus {
    border-color: ${COLORS.greyDarker};
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-1.1875rem, -50%);
    display: block;
    width: 1rem;
    height: 1rem;
    background-image: url('data:image/svg+xml,%3csvg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cpath d="M0.26416 6.88213C-0.0874023 7.22393 -0.0874023 7.779 0.26416 8.1208L5.66416 13.3708C6.01572 13.7126 6.58666 13.7126 6.93822 13.3708C7.28979 13.029 7.28979 12.4739 6.93822 12.1321L2.17385 7.5001L6.93541 2.86807C7.28697 2.52627 7.28697 1.97119 6.93541 1.62939C6.58385 1.2876 6.01291 1.2876 5.66135 1.62939L0.261348 6.87939L0.26416 6.88213Z" fill="%23292929"/%3e%3c/svg%3e');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 1rem 1rem;
  }
`;
