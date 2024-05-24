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
  color: ${({ $primaryColor, $secondaryColor }) =>
    $primaryColor ? 'white' : $secondaryColor || COLORS.blueMid};
  background: ${({ $primaryColor }) => $primaryColor || 'white'};
  padding: 10px 20px;
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
      color: ${COLORS.greyMid} !important;
      border-color: ${COLORS.greyLight} !important;
      background: ${COLORS.greyLight} !important;
    }
  `
      : null};
`;

export const Button = styled.button`
  ${ButtonStyles}
`;

export const LinkButton = styled(Link)`
  ${ButtonStyles}
  display: inline-block;
  text-decoration: none;
`;

export const SmallLinkButton = styled(Link)`
  ${ButtonStyles}
  text-decoration: none;
  padding: 4px 12px;
  font-weight: 400;
  border-radius: 5px;
  border: 2px solid
    ${({ $primaryColor, $secondaryColor }) => $primaryColor || $secondaryColor};
  &:hover {
    color: white !important;
  }
`;

export const BlueLinkButton = forwardRef<
  HTMLAnchorElement,
  Omit<
    ComponentProps<typeof LinkButton>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, href, ...props }, ref) => (
  <LinkButton
    ref={ref}
    href={href}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </LinkButton>
));
BlueLinkButton.displayName = 'BlueLinkButton';

export const BlueButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof Button>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, ...props }, ref) => (
  <Button
    ref={ref}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </Button>
));
BlueButton.displayName = 'BlueButton';

export const RedButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof Button>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, ...props }, ref) => (
  <Button
    ref={ref}
    {...props}
    $primaryColor={COLORS.redMid}
    $secondaryColor={COLORS.redDark}
    $tertiaryColor={COLORS.redDarker}
  >
    {children}
  </Button>
));
RedButton.displayName = 'RedButton';

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
  cursor: pointer;
`;

interface AsyncButtonProps
  extends Omit<ComponentProps<typeof BigButton>, 'onClick'> {
  onClick?: (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
  icon?: ReactNode;
}

export const BigAsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
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
BigAsyncButton.displayName = 'BigAsyncButton';

export const BigBlueAsyncButton = forwardRef<
  HTMLButtonElement,
  Omit<
    ComponentProps<typeof BigAsyncButton>,
    '$primaryColor' | '$secondaryColor' | '$tertiaryColor'
  >
>(({ children, ...props }, ref) => (
  <BigAsyncButton
    ref={ref}
    {...props}
    $primaryColor={COLORS.blueMid}
    $secondaryColor={COLORS.blueDark}
    $tertiaryColor={COLORS.blueDarker}
  >
    {children}
  </BigAsyncButton>
));
BigBlueAsyncButton.displayName = 'BigBlueAsyncButton';

export const ProfileButton = styled(Link)`
  ${sans.style}

  display: flex;
  align-items: center;
  gap: 0.75rem;

  outline: none;
  background: none;
  border: none;

  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &::before {
    content: '';
    display: block;
    width: 1.5625rem;
    height: 1.75rem;
    background-image: url("data:image/svg+xml,%3Csvg width='17' height='20' viewBox='0 0 18 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.19565 10.5557C10.5135 10.5557 11.7774 10.0289 12.7092 9.0912C13.6411 8.15352 14.1646 6.88175 14.1646 5.55566C14.1646 4.22958 13.6411 2.95781 12.7092 2.02013C11.7774 1.08245 10.5135 0.555664 9.19565 0.555664C7.87781 0.555664 6.61394 1.08245 5.68208 2.02013C4.75022 2.95781 4.22671 4.22958 4.22671 5.55566C4.22671 6.88175 4.75022 8.15352 5.68208 9.0912C6.61394 10.0289 7.87781 10.5557 9.19565 10.5557ZM7.42158 12.4307C3.59783 12.4307 0.5 15.5479 0.5 19.3955C0.5 20.0361 1.0163 20.5557 1.65295 20.5557H16.7384C17.375 20.5557 17.8913 20.0361 17.8913 19.3955C17.8913 15.5479 14.7935 12.4307 10.9697 12.4307H7.42158Z' fill='white'/%3E%3C/svg%3E");
    background-position: center;
    background-size: 1.5625rem 1.75rem;
    background-repeat: no-repeat;
  }
`;
