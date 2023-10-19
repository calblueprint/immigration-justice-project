import React from 'react';
import { InputTitleText, InputText, InputDiv } from './styles';

export default function TextInput({label, placeholder, erroring}: {label: string, placeholder: string, erroring: boolean, }) {
  return (
    <InputDiv>
      <InputTitleText>{label}</InputTitleText>
      <InputText $error={erroring} placeholder={placeholder}/>
    </InputDiv>
  );
}