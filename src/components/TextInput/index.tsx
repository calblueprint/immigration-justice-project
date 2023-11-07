import React, { Dispatch, SetStateAction } from 'react';
import { InputLabel, InputText, InputDiv, ErrorText } from './styles';

type TextInputProps = {
  label: string;
  placeholder: string;
  errorText?: string;
  type?: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function TextInput({
  label,
  placeholder,
  errorText = "",
  type="text",
  name,
  value,
  setValue,
}: TextInputProps) {
  return (
    <InputDiv>
      <InputLabel as="label">{label}</InputLabel>
      <InputText
        as="input"
        $error={errorText !== ""}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
