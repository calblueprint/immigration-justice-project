import React from 'react';
import { InputTitleText, InputText } from './styles';

export default function TextInput() {
  return (
    <>
      <InputTitleText>Label</InputTitleText>
      <InputText $error={false} placeholder='Input Suggestion'/>
    </>
  )
}
