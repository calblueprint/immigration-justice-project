import styled from 'styled-components';
import { Inter } from 'next/font/google';
import COLORS from '@/styles/colors';
import { pSBC } from '@/utils/helpers';

// fonts
const inter = Inter({ subsets: ['latin'] });

// containers
export const FilterDropdownContainer = styled.div`
  position: relative;
`;

export const FilterDropdownMenuBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(2px);

  display: 'flex';
  flex-direction: column;
  width: max-content;
  background: white;
  box-shadow: 0 2px 0.25em 0.1em rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0.2rem 0.3rem;
  border-radius: 0.5rem;
  z-index: 100;
`;

// button
export const FilterDropdownButton = styled.button<{
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
  ${inter.style}

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
      $changed ? pSBC(-0.1, COLORS.blueMid) : pSBC(-0.1, '#FFF')};
    color: ${({ $changed }) => ($changed ? pSBC(-0.1, '#FFFFFF') : 'black')};
  }
`;

// menu option
export const FilterDropdownOption = styled.p<{ $selected: boolean }>`
  padding: 0.5rem;
  color: ${COLORS.greyDarker};
  cursor: default;
  border-radius: 0.25rem;
  position: relative;

  &::before {
    content: '';
    background: #eee;
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
