import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Flex } from '@/styles/containers';
import COLORS from '@/styles/colors';
import { InputLabel, ErrorText, InputDiv, InputDate } from './styles';

type DateInputProps = {
  label: string;
  required?: boolean;
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
  required = false,
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
      <Flex $direction="row">
        <InputLabel as="label" htmlFor={id}>
          {label}
        </InputLabel>
        {required && <InputLabel $color={COLORS.redMid}> *</InputLabel>}
      </Flex>
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
