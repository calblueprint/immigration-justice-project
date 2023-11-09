import React, { Dispatch, SetStateAction } from 'react';
import { InputLabel, InputText, InputDiv, ErrorText } from './styles';

type TextInputProps = {
  label: string;
  placeholder: string;
  errorText?: string;
  type?: string;
  id?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function TextInput({
  label,
  placeholder,
  errorText = '',
  type = 'text',
  id, // try to incorporate id? using <label for={id}>
  value,
  setValue,
}: TextInputProps) {
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
        onChange={e => setValue(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
