import styled from 'styled-components';
import { Open_Sans as OpenSans } from 'next/font/google';
import COLORS from '@/styles/colors';
import { InputText, InputTitleText } from '../TextInput/styles';

// fonts
const openSans = OpenSans({ subsets: ['latin'] });

// containers
export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(2px);

  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  flex-direction: column;
  width: max-content;
  background: white;
  box-shadow: 0 2px 0.25em 0.1em rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0.2rem 0.3rem;
  border-radius: 0.5rem;
  z-index: 100;

  &:empty {
    &::after {
      content: 'No matches found!';
      padding: 0.5rem;
    }
  }
`;

// button
export const DropdownButton = styled.button<{
  $changed: boolean;
}>`
  outline: none;
  border: 1px solid ${COLORS.blueMid};
  border-radius: 100px;

  padding: 0.5rem 1rem;
  padding-right: 2rem;

  cursor: pointer;

  color: ${({ $changed }) => ($changed ? 'white' : 'black')};
  font-size: 0.9rem;
  ${openSans.style}

  background-color: ${({ $changed }) => ($changed ? COLORS.blueMid : 'white')};
  background-image: ${({ $changed }) =>
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='%23${
      $changed ? 'fff' : '000'
    }' d='M7.29374 13.2063C7.68437 13.5969 8.31874 13.5969 8.70937 13.2063L14.7094 7.20627C15.1 6.81565 15.1 6.18127 14.7094 5.79065C14.3187 5.40002 13.6844 5.40002 13.2937 5.79065L7.99999 11.0844L2.70624 5.79377C2.31562 5.40315 1.68124 5.40315 1.29062 5.79377C0.899994 6.1844 0.899994 6.81877 1.29062 7.2094L7.29062 13.2094L7.29374 13.2063Z'/%3e%3c/svg%3e")`};
  background-repeat: no-repeat;
  background-position: right 0.8em center;
  background-size: 0.75em 0.75em;

  transition: 150ms;

  &:hover,
  &:focus {
    background-color: ${({ $changed }) =>
      $changed ? COLORS.blueDark : COLORS.greyLight};
    color: ${({ $changed }) => ($changed ? COLORS.greyLight : 'black')};
  }
`;

// input
export const DropdownInputLabel = styled(InputTitleText)`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.625rem;
`;

export const DropdownInput = styled(InputText)`
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Cpath d='M7.29377 13.2062C7.6844 13.5968 8.31877 13.5968 8.7094 13.2062L14.7094 7.20615C15.1 6.81553 15.1 6.18115 14.7094 5.79053C14.3188 5.3999 13.6844 5.3999 13.2938 5.79053L8.00002 11.0843L2.70627 5.79365C2.31565 5.40303 1.68127 5.40303 1.29065 5.79365C0.900024 6.18428 0.900024 6.81865 1.29065 7.20928L7.29065 13.2093L7.29377 13.2062Z' fill='%23292929' /%3E %3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: right 0.75rem center;

  padding-right: 2.5rem;
`;

// menu option
export const DropdownItem = styled.p<{ $selected: boolean }>`
  color: ${COLORS.greyDarker};
  position: relative;
  cursor: default;
  border-radius: 0.25rem;
  padding: 0.5rem 2rem;
  font-size: 0.9375rem;

  background-image: ${({ $selected }) =>
    $selected
      ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' fill='%230069A9' stroke='%230069A9' /%3E %3Cpath d='M6.17794 10.8117L3.80728 8.32401L3 9.16517L6.17794 12.5L13 5.34116L12.1984 4.5L6.17794 10.8117Z' fill='white' /%3E %3C/svg%3E")`
      : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' stroke='%230069A9' /%3E%3C/svg%3E")`};
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
  background-position: left 0.5rem center;

  &::before {
    content: '';
    background: ${COLORS.greyLight};
    width: 100%;
    height: calc(100% - 0.2rem);
    border-radius: 0.25rem;
    top: 0;
    left: 0;
    transform: translateY(0.1rem);
    position: absolute;
    z-index: -1;
    opacity: ${({ $selected }) => ($selected ? '1' : '0')};
  }

  &:hover::before {
    opacity: 1;
  }
`;
