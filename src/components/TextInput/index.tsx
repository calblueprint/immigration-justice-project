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
  errorText = '',
<<<<<<< HEAD
  type,
  name,
=======
  type = 'text',
  id,
>>>>>>> 5b0b30c95144186f7f5a870ea5ed1b8238113152
  value,
  setValue,
}: TextInputProps) {
  return (
    <InputDiv>
<<<<<<< HEAD
      <InputTitleText>{label}</InputTitleText>
      <InputText
        $error={erroring}
        placeholder={placeholder}
        name={name}
=======
      <InputLabel as="label" htmlFor={id}>
        {label}
      </InputLabel>
      <InputText
        as="input"
        $error={errorText !== ''}
        placeholder={placeholder}
        id={id}
>>>>>>> 5b0b30c95144186f7f5a870ea5ed1b8238113152
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
<<<<<<< HEAD
      {erroring && <ErrorText>{errorText}</ErrorText>}
=======
      {errorText && <ErrorText>{errorText}</ErrorText>}
>>>>>>> 5b0b30c95144186f7f5a870ea5ed1b8238113152
    </InputDiv>
  );
}
