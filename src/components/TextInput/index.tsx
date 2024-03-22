import { Dispatch, SetStateAction, useCallback } from 'react';
import { ErrorText, InputDiv, InputLabel, InputText } from './styles';

type InputModeTypes =
  | 'decimal'
  | 'email'
  | 'numeric'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'none';

type TextInputProps = {
  label?: string;
  placeholder?: string;
  errorText?: string;
  inputMode?: InputModeTypes;
  type?: string;
  id?: string;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
};

export default function TextInput({
  label,
  placeholder = '',
  errorText = '',
  type = 'text',
  id,
  value,
  inputMode,
  setValue,
  onChange,
}: TextInputProps) {
  const handleChange = useCallback(
    (newValue: string) => {
      setValue?.(newValue);
      onChange?.(newValue);
    },
    [onChange, setValue],
  );

  return (
    <InputDiv>
      {label && (
        <InputLabel as="label" htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <InputText
        as="input"
        $error={errorText !== ''}
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={e => handleChange(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
