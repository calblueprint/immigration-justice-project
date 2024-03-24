import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { TextArea, TextAreaContainer } from './styles';

interface DefaultTextAreaInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  id?: string;
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
    <TextAreaContainer>
      {label && (
        <H4 as="label" htmlFor={id} $color={COLORS.greyDark}>
          {label}
        </H4>
      )}
      <TextArea
        id={id}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={e => handleChange(e.target.value)}
      />
      {error && <P $color={COLORS.redMid}>{error}</P>}
    </TextAreaContainer>
  );
}
