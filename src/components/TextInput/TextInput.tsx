import React from 'react';
import { InputTitleText, InputText, InputDiv, ErrorText } from './styles';

export default function TextInput({
  label,
  placeholder,
  erroring,
  errorText = '',
}: {
  label: string;
  placeholder: string;
  erroring: boolean;
  errorText: string;
}) {
  return (
    <InputDiv>
      <InputTitleText>{label}</InputTitleText>
      <InputText $error={erroring} placeholder={placeholder} />
      {erroring && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
