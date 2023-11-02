import React from 'react';
import { InputTitleText, InputText, InputDiv, ErrorText } from './styles';

type TextInputProps = {
  label: string;
  placeholder: string;
  erroring: boolean;
  errorText: string;
  type: string;
  name: string;
  value: string;
  setValue: (newValue: string) => void;
};

export default function TextInput({
  label,
  placeholder,
  erroring,
  errorText = '',
  type,
  name,
  value,
  setValue,
}: TextInputProps) {
  return (
    <InputDiv>
      <InputTitleText>{label}</InputTitleText>
      <InputText
        $error={erroring}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {erroring && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
