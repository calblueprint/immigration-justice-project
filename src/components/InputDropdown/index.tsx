'use client';

import { useCallback, useId, useMemo } from 'react';
import Select, {
  MenuProps,
  MultiValue,
  SingleValue,
  components,
} from 'react-select';
import { DropdownOption } from '@/types/dropdown';
import { P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { AnimatedWrapper, DropdownStyles, DropdownWrapper } from './styles';
import { ErrorText, InputLabel } from '../TextInput/styles';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: Set<string> | Map<string, string>;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: string | null) => void;
}

type InputDropdownProps = SingleSelectProps | MultiSelectProps;

// custom components
export function NoOptionsMessage() {
  return <P $color={COLORS.greyMid}>No matches found</P>;
}

export function AnimatedMenu(props: MenuProps<DropdownOption>) {
  return (
    <AnimatedWrapper>
      <components.Menu {...props} />
    </AnimatedWrapper>
  );
}

// main dropdown component
export default function InputDropdown({
  label,
  options,
  placeholder = '',
  error = '',
  disabled,
  required,
  onChange,
  multi,
}: InputDropdownProps) {
  const optionsArray = useMemo(
    () =>
      options instanceof Set
        ? Array.from(options).map(v => ({ label: v, value: v }))
        : Array.from(options.entries()).map(([k, v]) => ({
            value: k,
            label: v,
          })),
    [options],
  );

  const handleChange = useCallback(
    (newValue: MultiValue<DropdownOption> | SingleValue<DropdownOption>) => {
      if (multi && newValue instanceof Array) {
        onChange?.(new Set(newValue.map(v => v.value)));
      } else if (!multi && !(newValue instanceof Array)) {
        onChange?.(newValue ? newValue.value : null);
      } else {
        throw new Error('An unexpected error occurred!');
      }
    },
    [multi, onChange],
  );

  return (
    <DropdownWrapper>
      <InputLabel>{label}</InputLabel>
      <Select
        components={{ Menu: AnimatedMenu }}
        isClearable
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        hideSelectedOptions={false}
        noOptionsMessage={NoOptionsMessage}
        unstyled
        required={required}
        isDisabled={disabled}
        styles={DropdownStyles(multi, error !== '')}
        instanceId={useId()}
        options={optionsArray}
        placeholder={placeholder}
        isMulti={multi}
        onChange={handleChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </DropdownWrapper>
  );
}
