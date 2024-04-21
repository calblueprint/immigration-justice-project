import {
  ComponentProps,
  forwardRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useState,
} from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { sans } from '@/styles/fonts';
import { Spinner } from '@/styles/spinner';

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
  color: ${({ $primaryColor }) => ($primaryColor ? 'white' : COLORS.blueMid)};
  background: ${({ $primaryColor }) => $primaryColor || 'white'};
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 150ms ease-in-out;
  font-size: 1rem;
  font-weight: 600;

  border: 2px solid
    ${({ $primaryColor, $secondaryColor }) =>
      $primaryColor || ($secondaryColor ?? COLORS.blueMid)};

  &:hover {
    color: white;
    background: ${({ $secondaryColor }) => $secondaryColor ?? COLORS.blueMid};
    border-color: ${({ $secondaryColor }) => $secondaryColor ?? COLORS.blueMid};
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

  padding: .9375rem 0;
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

export const BigBlueLinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<
    ComponentProps<typeof BigLinkButton>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, href, ...props }, ref) => (
  <BigLinkButton
    ref={ref}
    href={href}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </BigLinkButton>
));
BigBlueLinkButton.displayName = 'BigBlueLinkButton';

export const UnstyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
`;

interface AsyncButtonProps
  extends Omit<ComponentProps<typeof BigButton>, 'onClick'> {
  onClick?: (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
  icon?: ReactNode;
}

export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  ({ children, onClick: asyncOnClick, icon = <Spinner />, ...props }, ref) => {
    const [loading, setLoading] = useState(false);

    const onClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (loading) return;

      if (asyncOnClick) {
        setLoading(true);
        asyncOnClick(e).finally(() => setLoading(false));
      }
    };

    return (
      <BigButton ref={ref} onClick={onClick} disabled={loading} {...props}>
        <Flex $gap="10px" $justify="center">
          {loading ? icon : null}
          {children}
        </Flex>
      </BigButton>
    );
  },
);
AsyncButton.displayName = 'AsyncButton';

export const BigBlueAsyncButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof AsyncButton>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, ...props }, ref) => (
  <AsyncButton
    ref={ref}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </AsyncButton>
));
BigBlueAsyncButton.displayName = 'BigBlueAsyncButton';
