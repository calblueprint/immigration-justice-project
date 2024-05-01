import Link from 'next/link';
import styled, { css } from 'styled-components';
import { sans } from '@/styles/fonts';

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
const ButtonStyles = css<{ $primaryColor?: string; $secondaryColor: string }>`
  ${sans.style}
  appearance: none;
  color: ${props => (props.$primaryColor ? 'white' : 'black')};
  background: ${props => (props.$primaryColor ? props.$primaryColor : 'white')};
  padding: 0.625rem 1.25rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid
    ${props =>
      props.$primaryColor ? props.$primaryColor : props.$secondaryColor};
  cursor: pointer;
  transition: 150ms ease-in-out;
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    background: ${props => props.$secondaryColor};
    color: white;
    border-color: ${props => props.$secondaryColor};
  }
`;

const Button = styled.button`
  ${ButtonStyles}
`;

export const LinkButton = styled(Link)`
  ${ButtonStyles}
  text-decoration: none;
`;
const SmallButtonStyles = css<{
  $primaryColor?: string;
  $secondaryColor: string;
  $fontColor?: string;
}>`
  ${sans.style}
  appearance: none;
  color: ${props => props.$fontColor || 'black'};
  background: ${props => (props.$primaryColor ? props.$primaryColor : 'white')};
  padding: 0.25rem 0.75rem;
  border-radius: 0.313rem; // 5px
  border: 2px solid
    ${props =>
      props.$primaryColor ? props.$primaryColor : props.$secondaryColor};
  cursor: pointer;
  transition: 150ms ease-in-out;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    background: ${props => props.$secondaryColor};
    color: white;
    border-color: ${props => props.$secondaryColor};
  }
`;
export const SmallerButton = styled.button`
  ${SmallButtonStyles}
`;
export const SmallLinkButton = styled(Link)`
  ${SmallButtonStyles}
  text-decoration: none;
`;

export default Button;
