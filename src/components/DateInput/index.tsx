import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { InputLabel, P } from '@/styles/text';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { InputDate } from './styles';

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
      setValue?.(val);
      onChange?.(val);
    },
    [onChange, setValue],
  );

  return (
    <Flex $direction="column" $gap="10px">
      {label && (
        <InputLabel as="label" htmlFor={id} $required={required}>
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
      {error && <P $color={COLORS.redMid}>{error}</P>}
    </Flex>
  );
}
