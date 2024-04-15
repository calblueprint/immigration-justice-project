import styled, { css } from 'styled-components';
import Link from 'next/link';
import { sans } from '@/styles/fonts';
import COLORS from '@/styles/colors';
import { ComponentProps, forwardRef } from 'react';

/* 
  FOR PRIMARY BUTTON USAGE:

    Props: 
      $primaryColor (Required) - This color will determine the default background color of the button
      $secondaryColor (Required) - This color will determine the border color and background color on hover
   
    Example:
      <Button $primaryColor={COLORS.blueMid} $secondaryColor={COLORS.blueDark} onClick={...}>
        [Button text here]
      </Button>

  FOR SECONDARY BUTTON USAGE:

    Props:
      $primaryColor (Omit) - IMPORTANT: DO NOT PASS IN A primaryColor PROP!!! The background color will be white by default
      $secondaryColor (Required) - This color will determine the border color and background color on hover

    Example: 
      <Button $secondaryColor={COLORS.blueMid} onClick={...}>
        [Button text here]
      </Button>
 */
interface ButtonProps {
  $primaryColor?: string;
  $secondaryColor?: string;
  $tertiaryColor?: string;
  disabled?: boolean;
}

const ButtonStyles = css<ButtonProps>`
  ${sans.style}
  appearance: none;
  color: ${props => (props.$primaryColor ? 'white' : COLORS.blueMid)};
  background: ${props => (props.$primaryColor ? props.$primaryColor : 'white')};
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 150ms ease-in-out;
  font-size: 1rem;
  font-weight: 600;

  border: 2px solid
    ${props =>
      props.$primaryColor
        ? props.$primaryColor
        : props.$secondaryColor ?? COLORS.blueMid};

  &:hover {
    color: white;
    background: ${props => props.$secondaryColor ?? COLORS.blueMid};
    border-color: ${props => props.$secondaryColor ?? COLORS.blueMid};
  }

  &:active {
    color: white;
    background: ${({ $tertiaryColor }) => $tertiaryColor ?? COLORS.blueDark};
    border-color: ${({ $tertiaryColor }) => $tertiaryColor ?? COLORS.blueDark};
  }

  ${({ disabled }) =>
    disabled
      ? `
    border-color: ${COLORS.greyLight};
    background: ${COLORS.greyLight};
    color: ${COLORS.greyMid};
    cursor: default;

    &:hover {
      color: ${COLORS.greyMid};
      border-color: ${COLORS.greyLight};
      background: ${COLORS.greyLight};
    }

    &:active {
      color: ${COLORS.greyMid};
      border-color: ${COLORS.greyLight};
      background: ${COLORS.greyLight};
    }
  `
      : null};
`;

export const Button = styled.button`
  ${ButtonStyles}
`;

export const LinkButton = styled(Link)`
  ${ButtonStyles}
  text-decoration: none;
`;

const BigButtonStyles = css<ButtonProps>`
  ${ButtonStyles}

  padding: 15px 0;
  width: 100%;

  &:active {
    background: ${COLORS.blueDarker};
  }
`;

export const BigButton = styled.button<ButtonProps>`
  ${BigButtonStyles}
`;

export const BigLinkButton = styled(Link)<ButtonProps>`
  ${BigButtonStyles}
  text-decoration: none;
  text-align: center;
`;

export const BigBlueButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof BigButton>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, ...props }, ref) => (
  <BigButton
    ref={ref}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </BigButton>
));
BigBlueButton.displayName = 'BigBlueButton';

export const UnstyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
`;
