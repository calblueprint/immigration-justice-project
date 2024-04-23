import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { sans } from '@/styles/fonts';

export const DropdownContainer = styled.div`
  position: relative;
`;

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
  ${sans.style}

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
      $changed ? COLORS.blueDark : COLORS.greyLighter};
    color: ${({ $changed }) => ($changed ? COLORS.greyLighter : 'black')};
  }
`;
