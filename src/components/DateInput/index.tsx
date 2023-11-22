import React, { Dispatch, SetStateAction } from 'react';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

type TextInputProps = {
  label: string;
  error: boolean;
  errorText: string;
  name: string;
  value: string;
  filled: boolean;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function DateInput({
  label,
  error,
  errorText = '',
  name,
  value,
  filled,
  setValue,
}: TextInputProps) {
  return (
    <InputDiv>
      {' '}
      <InputLabel>{label}</InputLabel>
      <InputDate
        required
        type="date"
        $error={error}
        $filled={filled}
        name={name}
        value={value}
        min={new Date().toISOString().split('T')[0]}
        onChange={e => setValue(e.target.value)}
      />
      {error && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
