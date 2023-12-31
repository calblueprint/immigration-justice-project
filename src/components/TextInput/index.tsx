import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { InputLabel, InputText, InputDiv, ErrorText } from './styles';

type TextInputProps = {
  label: string;
  placeholder?: string;
  errorText?: string;
  type?: string;
  id?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
};

export default function TextInput({
  label,
  placeholder = '',
  errorText = '',
  type = 'text',
  id,
  value,
  setValue,
  onChange,
}: TextInputProps) {
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
      <InputText
        as="input"
        $error={errorText !== ''}
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
