import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

interface DateInputProps {
  label?: string;
  error?: string;
  name?: string;
  id?: string;
  min?: string | number;
  value: string;
  // TODO: refactor away from set value to use onChange instead
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
  required?: boolean;
}

export default function DateInput({
  label,
  error = '',
  name,
  value,
  setValue,
  id,
  min,
  required = true,
  onChange,
}: DateInputProps) {
  const handleChange = useCallback(
    (val: string) => {
      setValue?.(val);
      onChange?.(val);
    },
    [onChange, setValue],
  );

  return (
    <InputDiv>
      {label && (
        <InputLabel as="label" htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <InputDate
        id={id}
        required={required}
        type="date"
        $error={error !== ''}
        $filled={value !== ''}
        name={name}
        value={value}
        pattern=".*\s*"
        min={min}
        onChange={e => handleChange(e.target.value)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputDiv>
  );
}
