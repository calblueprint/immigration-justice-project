import React, { Dispatch, SetStateAction } from 'react';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

type DateInputProps = {
  label: string;
  error?: string;
  name?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function DateInput({
  label,
  error = '',
  name,
  value,
  setValue,
}: DateInputProps) {
  return (
    <InputDiv>
      <InputLabel>{label}</InputLabel>
      <InputDate
        required
        type="date"
        $error={error}
        $filled={value !== ''}
        name={name}
        value={value}
        min={new Date().toISOString().split('T')[0]}
        onChange={e => setValue(e.target.value)}
      />
      {error !== '' && <ErrorText>{error}</ErrorText>}
    </InputDiv>
  );
}
