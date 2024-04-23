'use client';

import { ReactElement, useCallback, useId, useRef } from 'react';
import { GroupBase, InputActionMeta, SelectInstance } from 'react-select';
import {
  ComponentProps,
  UseAsyncPaginateParams,
  withAsyncPaginate,
} from 'react-select-async-paginate';
import Creatable from 'react-select/creatable';
import type { CreatableProps } from 'react-select/creatable';
import { AnimatedMenu, NoOptionsMessage } from '@/components/InputDropdown';
import {
  DropdownStyles,
  DropdownWrapper,
} from '@/components/InputDropdown/styles';
import { ErrorText, InputLabel } from '@/components/TextInput/styles';
import { DropdownOption } from '@/types/dropdown';

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

interface CustomProps<Additional, IsMulti extends boolean>
  extends AsyncPaginateCreatableProps<
    DropdownOption,
    GroupBase<DropdownOption>,
    Additional,
    IsMulti
  > {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

type AsyncPaginateCreatableType = <Additional, IsMulti extends boolean = false>(
  props: CustomProps<Additional, IsMulti>,
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable,
) as AsyncPaginateCreatableType;

export default function CreatableBigDataDropdown<
  Additional,
  IsMulti extends boolean,
>({
  loadOptions,
  label,
  placeholder = '',
  error = '',
  disabled,
  required,
  isMulti,
  ...props
}: CustomProps<Additional, IsMulti>) {
  const ref = useRef<SelectInstance<
    DropdownOption,
    IsMulti,
    GroupBase<DropdownOption>
  > | null>(null);

  const handleInputChange = useCallback(
    (nv: string, meta: InputActionMeta) => {
      if (meta.action !== 'input-change') return;

      if (ref.current && ref.current.menuListRef)
        ref.current.menuListRef.scrollTop = 0;
    },
    [ref],
  );

  return (
    <DropdownWrapper>
      {label && <InputLabel>{label}</InputLabel>}
      <CreatableAsyncPaginate
        selectRef={ref}
        components={{ Menu: AnimatedMenu }}
        isClearable
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        tabSelectsValue={false}
        instanceId={useId()}
        isMulti={isMulti}
        placeholder={placeholder}
        noOptionsMessage={NoOptionsMessage}
        unstyled
        styles={DropdownStyles(isMulti, error !== '')}
        isDisabled={disabled}
        required={required}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </DropdownWrapper>
  );
}
