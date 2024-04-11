import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
} from 'react';
import { ErrorText, InputDiv, InputLabel, InputText } from './styles';

interface DefaultTextInputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange' | 'ref'
  > {
  label?: string;
  placeholder?: string;
  errorText?: string;
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
  defaultValue,
  setValue,
  onChange,
  ...props
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
        onChange={e => handleChange(e.target.value)}
        {...props}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
