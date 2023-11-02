import React, { Dispatch, SetStateAction } from 'react';
import { InputTitleText, InputText, InputDiv, ErrorText } from './styles';

type TextInputProps = {
  label: string;
  placeholder: string;
  erroring: boolean;
  errorText: string;
  type: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
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
      <InputTitleText as="label">{label}</InputTitleText>
      <InputText
        as="input"
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
