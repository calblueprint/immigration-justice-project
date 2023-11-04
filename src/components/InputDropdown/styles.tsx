import styled from 'styled-components';
import { P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { InputTitleText, InputText } from '../TextInput/styles';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownInputLabel = styled(InputTitleText)`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.625rem;
`;

export const DropdownInputTag = styled(P)`
  display: flex;
  width: fit-content;
  align-items: center;
  position: relative;
  background: ${COLORS.blueLighter};
  padding: 0.125rem 0.5625rem;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    margin-left: 0.625rem;
    width: 0.6875rem;
    height: 0.6875rem;

    background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2211%22%20height%3D%2211%22%20viewBox%3D%220%200%2011%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url%28%23clip0_1137_1315%29%22%3E%0A%3Cpath%20d%3D%22M10.5416%209.24365L6.79019%205.49127L10.5416%201.74485L9.24365%200.458313L5.49356%204.20702L1.74623%200.458313L0.458313%201.74623L4.21023%205.50273L0.458313%209.25373L1.74623%2010.5416L5.50594%206.78698L9.25511%2010.5416L10.5416%209.24365Z%22%20fill%3D%22%23292929%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_1137_1315%22%3E%0A%3Crect%20width%3D%2211%22%20height%3D%2211%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E');
    background-size: 0.6875rem 0.6875rem;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const DropdownInput = styled(P)<{
  $placeholder?: string;
  $hidden?: boolean;
}>`
  display: inline-block;
  outline: none;
  flex-grow: 1;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  position: relative;
  ${({ $hidden }) => $hidden && `height: 0`};

  &::after {
    position: absolute;
    transform: translateY(-50%);
    content: '${({ $placeholder }) => $placeholder || ''}';
    color: ${COLORS.placeholderText};
    font-size: 0.875rem;
    opacity: ${({ $hidden }) => ($hidden ? 1 : 0)};
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 0.5rem;
  gap: 0.5rem;

  &:empty {
    margin: 0;
  }
`;

export const DropdownInputContainer = styled(InputText)<{ $focused: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  cursor: text;
  min-height: 2.9375rem;
  padding-right: 2.25rem;
  ${({ $focused }) => $focused && `row-gap: 0.5rem`};
  border-color: ${({ $focused }) =>
    $focused ? COLORS.blueMid : COLORS.placeholderText} !important;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.75rem;
    width: 1rem;
    height: 1rem;
    transform: translateY(-50%)
      ${({ $focused }) => $focused && `rotate(180deg)`};
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Cpath d='M7.29377 13.2062C7.6844 13.5968 8.31877 13.5968 8.7094 13.2062L14.7094 7.20615C15.1 6.81553 15.1 6.18115 14.7094 5.79053C14.3188 5.3999 13.6844 5.3999 13.2938 5.79053L8.00002 11.0843L2.70627 5.79365C2.31565 5.40303 1.68127 5.40303 1.29065 5.79365C0.900024 6.18428 0.900024 6.81865 1.29065 7.20928L7.29065 13.2093L7.29377 13.2062Z' fill='%23292929' /%3E %3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1rem;
    background-position: center;
    transition: 200ms ease-in-out;
  }
`;
