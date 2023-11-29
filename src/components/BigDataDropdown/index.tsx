'use client';

import { useCallback, useId, useMemo } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { GroupBase, MultiValue, SingleValue } from 'react-select';
import { DropdownOption } from '@/types/dropdown';
import { DropdownStyles, DropdownWrapper } from '../InputDropdown/styles';
import { ErrorText, InputLabel } from '../TextInput/styles';
import { AnimatedMenu, NoOptionsMessage } from '../InputDropdown';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: Set<string> | Map<string, string>;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  pageSize?: number;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: string | null) => void;
}

type BigDataDropdownProps = SingleSelectProps | MultiSelectProps;

export default function BigDataDropdown({
  options,
  label,
  placeholder = '',
  error = '',
  disabled,
  required,
  multi,
  pageSize = 10,
  onChange,
}: BigDataDropdownProps) {
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

  const loadOptions: LoadOptions<
    DropdownOption,
    GroupBase<DropdownOption>,
    null
  > = useCallback(
    async (search, prevOptions) => {
      const filteredOptions = search
        ? optionsArray.filter(o => o.label.includes(search))
        : optionsArray;
      const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + pageSize,
      );
      // const hasMore = filteredOptions.length > prevOptions.length + pageSize;
      return {
        options: slicedOptions,
        hasMore: true,
      };
    },
    [optionsArray, pageSize],
  );

  return (
    <DropdownWrapper>
      <InputLabel>{label}</InputLabel>
      <AsyncPaginate
        menuIsOpen
        components={{ Menu: AnimatedMenu }}
        isClearable
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        tabSelectsValue={false}
        instanceId={useId()}
        options={optionsArray}
        isMulti={multi}
        onChange={handleChange}
        placeholder={placeholder}
        noOptionsMessage={NoOptionsMessage}
        unstyled
        styles={DropdownStyles(multi, error !== '')}
        isDisabled={disabled}
        required={required}
        loadOptions={loadOptions}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </DropdownWrapper>
  );
}
