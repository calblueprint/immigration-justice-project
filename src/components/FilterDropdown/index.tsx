'use client';

import { useState } from 'react';
import {
  FilterDropdownContainer,
  FilterDropdownButton,
  FilterDropdownOption,
} from './styles';
import FilterDropdownMenu from './FilterDropdownMenu';

// custom type
export type DropdownOption = {
  name: string;
  displayName: string;
};

export default function FilterDropdown({
  defaultValue,
  options,
  multi = false,
  onChange,
}: {
  defaultValue: string;
  options: DropdownOption[];
  multi?: boolean;
  onChange?: (name: string) => void;
}) {
  const [menuHidden, setMenuHidden] = useState(true);
  const [currentValue, setCurrentValue] = useState(
    multi ? [defaultValue] : defaultValue,
  );

  // const maxWidth =
  //   144 + 0.176 * Math.max(...options.map(o => o.displayName.length)) ** 2;

  // handle select option
  function handleOptionClick(option: DropdownOption) {
    setMenuHidden(true);
    onChange?.(option.name);
    setCurrentValue(option.displayName);
  }

  return (
    <FilterDropdownContainer>
      <FilterDropdownButton
        $changed={defaultValue !== currentValue}
        onClick={() => setTimeout(() => menuHidden && setMenuHidden(false), 0)}
      >
        {currentValue}
      </FilterDropdownButton>
      {!menuHidden && (
        <FilterDropdownMenu closeMenu={() => setMenuHidden(true)}>
          {options.map(o => (
            <FilterDropdownOption
              key={o.name}
              onClick={() => handleOptionClick(o)}
              $selected={
                multi
                  ? currentValue.includes(o.displayName)
                  : o.displayName === currentValue
              }
            >
              {o.displayName}
            </FilterDropdownOption>
          ))}
        </FilterDropdownMenu>
      )}
    </FilterDropdownContainer>
  );
}
