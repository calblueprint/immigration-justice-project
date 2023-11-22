import styled from 'styled-components';
import { StylesConfig } from 'react-select';
import COLORS from '@/styles/colors';
import { DropdownOption } from '@/types/dropdown';
import { InputLabel } from '../TextInput/styles';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DropdownLabel = styled(InputLabel)``;

export const DropdownStyles = (
  multi?: boolean,
): StylesConfig<DropdownOption> => ({
  menuList: baseStyles => ({
    ...baseStyles,
    padding: '0.2rem 0.3rem',
  }),
  option: (baseStyles, state) => ({
    position: 'relative',
    color: COLORS.greyDarker,
    borderRadius: '0.25rem',
    padding: '0.5rem',
    paddingLeft: multi ? '2rem' : '1rem',
    fontSize: '0.9375rem',
    backgroundImage: state.isSelected
      ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' fill='%230069A9' stroke='%230069A9' /%3E %3Cpath d='M6.17794 10.8117L3.80728 8.32401L3 9.16517L6.17794 12.5L13 5.34116L12.1984 4.5L6.17794 10.8117Z' fill='white' /%3E %3C/svg%3E")`
      : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' stroke='%230069A9' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1rem 1rem',
    transition: '150ms',
    backgroundPosition: 'left 0.5rem center',
    '::before': {
      content: '""',
      background: state.isSelected ? COLORS.blueLighter : COLORS.greyLighter,
      width: '100%',
      height: 'calc(100% - 0.25rem)',
      borderRadius: '0.25rem',
      top: 0,
      left: 0,
      position: 'absolute',
      transform: 'translateY(0.1rem)',
      zIndex: -1,
      opacity: state.isSelected ? 1 : 0,
    },
    ':hover': {
      '::before': {
        opacity: 1,
      },
    },
    ':focus': {
      '::before': {
        opacity: 1,
      },
    },
  }),
});
