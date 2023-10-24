'use client';

import React, { useState } from 'react';
import TextInput from '../../components/TextInput';

export default function InputTextTest() {
  const [val, setVal] = useState('');
  return (
    <TextInput
      label="Label"
      placeholder="Input Suggestion"
      erroring={false}
      errorText="Error Text"
      type="email"
      name="email"
      value={val}
      setValue={setVal}
    />
  );
}
