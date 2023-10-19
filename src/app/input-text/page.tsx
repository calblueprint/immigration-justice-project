'use client';

import React from 'react';
import { InputTitleText, InputText } from '../../components/TextInput/styles';

export default function InputTextTest() {
  return (
    <>
      <InputTitleText>Label</InputTitleText>
      <InputText $error={false} placeholder="Input Suggestion" />
    </>
  );
}
