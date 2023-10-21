'use client';

import React from 'react';
import TextInput from '../../components/TextInput';

export default function InputTextTest() {
  return (
    <TextInput
      label="Label"
      placeholder="Input Suggestion"
      erroring={false}
      errorText="Error Text"
    />
  );
}
