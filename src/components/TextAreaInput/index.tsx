import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { InputLabel, P } from '@/styles/text';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { TextArea } from './styles';

interface DefaultTextAreaInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  id?: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: (s: string) => void;
}

interface ControlledTextAreaInputProps extends DefaultTextAreaInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface UncontrolledTextAreaInputProps extends DefaultTextAreaInputProps {
  value?: never;
  setValue?: never;
}

type TextAreaInputProps =
  | ControlledTextAreaInputProps
  | UncontrolledTextAreaInputProps;

export default function TextAreaInput({
  label,
  required = false,
  placeholder = '',
  error = '',
  id,
  value,
  defaultValue,
  setValue,
  onChange,
}: TextAreaInputProps) {
  const handleChange = useCallback(
    (val: string) => {
      setValue?.(val);
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
        defaultValue={defaultValue}
        onChange={e => handleChange(e.target.value)}
      />
      {!!error && <P $color={COLORS.redMid}>{error}</P>}
    </Flex>
  );
}
