import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { InputLabel, P } from '@/styles/text';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { TextArea } from './styles';

export default function TextAreaInput({
  label,
  required = false,
  placeholder = '',
  error = '',
  id,
  value,
  setValue,
  onChange,
}: {
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  id?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
}) {
  const handleChange = useCallback(
    (val: string) => {
      setValue(val);
      onChange?.(val);
    },
    [setValue, onChange],
  );

  return (
    <Flex $direction="column" $gap="10px">
      {required && (
        <InputLabel
          as="label"
          htmlFor={id}
          $color={COLORS.greyDark}
          $required={required}
        >
          {label}
        </InputLabel>
      )}
      <TextArea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      {!!error && <P $color={COLORS.redMid}>{error}</P>}
    </Flex>
  );
}
