import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

type DateInputProps = {
  label: string;
  error?: string;
  name?: string;
  value: string;
  id?: string;
  min?: string | number;
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
};

export default function DateInput({
  label,
  error = '',
  name,
  value,
  setValue,
  id,
  min,
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
      <InputLabel as="label" htmlFor={id}>
        {label}
      </InputLabel>
      <InputDate
        id={id}
        required
        type="date"
        $error={error}
        $filled={value !== ''}
        name={name}
        value={value}
        min={min}
        onChange={e => handleChange(e.target.value)}
      />
      {error !== '' && <ErrorText>{error}</ErrorText>}
    </InputDiv>
  );
}
