import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

type DateInputProps = {
  label: string;
  error?: string;
  name?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
};

export default function DateInput({
  label,
  error = '',
  name,
  value,
  setValue,
  onChange,
}: DateInputProps) {
  const handleChange = useCallback(
    (val: string) => {
      setValue(val);
      onChange?.(val);
    },
    [onChange, setValue],
  );

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
        onChange={e => handleChange(e.target.value)}
      />
      {error !== '' && <ErrorText>{error}</ErrorText>}
    </InputDiv>
  );
}