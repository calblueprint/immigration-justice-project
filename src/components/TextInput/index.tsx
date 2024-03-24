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

interface DefaultTextInputProps {
  label?: string;
  placeholder?: string;
  errorText?: string;
  inputMode?: InputModeTypes;
  type?: string;
  id?: string;
  defaultValue?: string;
  onChange?: (s: string) => void;
}

// TODO: refactor away from setValue
// -- reasoning: it's redundant, use onChange instead
interface ControlledTextInputProps extends DefaultTextInputProps {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

interface UncontrolledTextInputProps extends DefaultTextInputProps {
  value?: never;
  // setValue defined here to stay consistent with the controlled props
  setValue?: never;
}

type TextInputProps = ControlledTextInputProps | UncontrolledTextInputProps;

export default function TextInput({
  label,
  placeholder = '',
  errorText = '',
  type = 'text',
  id,
  value,
  inputMode,
  defaultValue,
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
        defaultValue={defaultValue}
        inputMode={inputMode}
        onChange={e => handleChange(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
