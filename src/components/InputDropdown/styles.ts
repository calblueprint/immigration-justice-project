import { StylesConfig } from 'react-select';
import styled, { keyframes } from 'styled-components';
import COLORS from '@/styles/colors';
import { DropdownOption } from '@/types/dropdown';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: white;
  z-index: 999;
  animation: 80ms ${fadeInKeyframes} cubic-bezier(0, 0, 0.35, 1) forwards;
`;

const getControlBorderColor = (
  hasValue: boolean,
  inFocus: boolean,
  error?: boolean,
) => {
  if (error) return COLORS.redMid;
  if (inFocus) return COLORS.blueMid;
  return hasValue ? COLORS.greyMid : COLORS.greyLight;
};

const determineOptionColor = (focused: boolean, selected: boolean) => {
  if (selected) return focused ? COLORS.blueLight : COLORS.blueLighter;
  return focused ? COLORS.greyLighter : 'transparent';
};

export const DropdownStyles = (
  multi?: boolean,
  error?: boolean,
): StylesConfig<DropdownOption> => ({
  noOptionsMessage: baseStyles => ({
    ...baseStyles,
    padding: '0.3125rem 0',
  }),
  indicatorSeparator: (baseStyles, state) => ({
    ...baseStyles,
    visibility: state.isDisabled ? 'hidden' : 'visible',
    background: COLORS.greyLight,
    height: 'calc(100% - 0.5rem)',
    margin: 'auto 0.3125rem',
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
    transition: '200ms ease-in-out',
    color: COLORS.greyDarker,
  }),
  clearIndicator: baseStyles => ({
    ...baseStyles,
    cursor: 'default',
    color: COLORS.greyMid,
    ':hover': {
      color: COLORS.greyDark,
    },
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    fontSize: '0.875rem',
    padding: '0.125rem, 0',
  }),
  multiValue: baseStyles => ({
    ...baseStyles,
    background: COLORS.blueLighter,
    paddingLeft: '0.5rem',
    margin: '0.25rem 0.5rem 0.25rem 0',
    borderRadius: '3px',
  }),
  multiValueRemove: baseStyles => ({
    ...baseStyles,
    padding: '0 0.25rem',
    marginLeft: '0.25rem',
    cursor: 'pointer',
    ':hover': {
      background: 'rgba(0, 0, 0, 0.1)',
    },
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: COLORS.placeholderText,
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    cursor: 'text',
    color: COLORS.greyDarker,
    minHeight: '2.9375rem',
    padding: '0.375rem 0.625rem',
    borderRadius: '0.313rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: getControlBorderColor(state.hasValue, state.isFocused, error),
    background: state.selectProps.isDisabled ? COLORS.greyLighter : 'white',
  }),
  menu: baseStyles => ({
    ...baseStyles,
    background: 'white',
    boxShadow: '0 2px 0.25rem 0.1rem rgba(0, 0, 0, 0.25)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    padding: '0.3rem',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    position: 'relative',
    color: COLORS.greyDarker,
    borderRadius: '0.25rem',
    padding: '0.5rem',
    paddingLeft: multi ? '2rem' : '1rem',
    fontSize: '0.875rem',
    backgroundImage: state.isSelected
      ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' fill='%230069A9' stroke='%230069A9' /%3E %3Cpath d='M6.17794 10.8117L3.80728 8.32401L3 9.16517L6.17794 12.5L13 5.34116L12.1984 4.5L6.17794 10.8117Z' fill='white' /%3E %3C/svg%3E")`
      : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' stroke='%230069A9' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: multi ? '1rem 1rem' : '0',
    backgroundPosition: 'left 0.5rem center',
    transition: '150ms',
    cursor: 'pointer',
    '::before': {
      content: '""',
      background: determineOptionColor(state.isFocused, state.isSelected),
      width: '100%',
      height: 'calc(100% - 0.25rem)',
      borderRadius: '0.25rem',
      top: 0,
      left: 0,
      position: 'absolute',
      transform: 'translateY(0.1rem)',
      zIndex: -1,
    },
  }),
});
