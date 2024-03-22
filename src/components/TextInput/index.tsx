import { ErrorText, InputDiv, InputLabel, InputText } from './styles';

type TextInputProps = {
  label?: string;
  placeholder?: string;
  errorText?: string;
  type?: string;
  id?: string;
  value: string;
  onChange?: (s: string) => void;
};

export default function TextInput({
  label,
  placeholder = '',
  errorText = '',
  type = 'text',
  id,
  value,
  onChange,
}: TextInputProps) {
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
        onChange={e => onChange?.(e.target.value)}
      />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </InputDiv>
  );
}
