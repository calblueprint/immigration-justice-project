'use client';

import React, { useCallback, useId } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { DropdownOption } from '@/types/dropdown';
import { DropdownLabel, DropdownWrapper } from './styles';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: DropdownOption[];
  placeholder: string;
  label: string;
}

// if using map for options, value should correspond with keys
interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: readonly DropdownOption[]) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: DropdownOption | null) => void;
}

type FilterDropdownProps = SingleSelectProps | MultiSelectProps;

export default function InputDropdown({
  label,
  options,
  placeholder,
  onChange,
  multi,
}: FilterDropdownProps) {
  const handleChange = useCallback(
    (newValue: MultiValue<DropdownOption> | SingleValue<DropdownOption>) => {
      if (multi && newValue instanceof Array) {
        onChange?.(newValue);
      } else if (!multi && !(newValue instanceof Array)) {
        onChange?.(newValue);
      } else {
        throw new Error('An unexpected error occurred!');
      }
    },
    [multi, onChange],
  );

  return (
    <DropdownWrapper>
      <DropdownLabel>{label}</DropdownLabel>
      <Select
        instanceId={useId()}
        options={options}
        placeholder={placeholder}
        isMulti={multi}
        onChange={newValue => handleChange(newValue)}
      />
    </DropdownWrapper>
  );
}
