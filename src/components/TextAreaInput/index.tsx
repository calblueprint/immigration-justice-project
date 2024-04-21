import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { TextArea, TextAreaContainer } from './styles';

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
  label: string;
  required?: boolean;
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
    <TextAreaContainer>
      <H4 as="label" htmlFor={id} $color={COLORS.greyDark} $required={required}>
        {label}
      </H4>
      <TextArea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      {error && <P $color={COLORS.redMid}>{error}</P>}
    </TextAreaContainer>
  );
}
