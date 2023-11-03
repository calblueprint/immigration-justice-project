import styled from 'styled-components';
import { InputTitleText, InputText } from '../TextInput/styles';

export const DropdownContainer = styled.div`
  position: relative;
`;

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
