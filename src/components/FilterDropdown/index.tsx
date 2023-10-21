'use client';

import { useState } from 'react';
import {
  FilterDropdownContainer,
  FilterDropdownButton,
  FilterDropdownOption,
} from './styles';
import FilterDropdownMenu from './FilterDropdownMenu';

export default function FilterDropdown({
  defaultValue,
  options,
  multi = false,
  onChange,
}: {
  defaultValue: string;
  options: string[];
  multi?: boolean;
  onChange?: (name: string | string[]) => void;
}) {
  const [menuShown, setMenuShown] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    multi ? [defaultValue] : defaultValue,
  );

  // handle select option
  function handleOptionClick(val: string) {
    if (typeof currentValue === 'object') {
      if (val === defaultValue) {
        setCurrentValue([defaultValue]);
        onChange?.([defaultValue]);
        return;
      }

      const newList = currentValue.includes(val)
        ? currentValue.filter(v => v !== val)
        : [...currentValue, val];

      // reset to default
      if (newList.length === 0) {
        setCurrentValue([defaultValue]);
        onChange?.([defaultValue]);
        return;
      }

      // cut out default
      if (newList.length > 1) {
        const defaultValIndex = newList.findIndex(v => v === defaultValue);
        if (defaultValIndex !== -1) newList.splice(defaultValIndex, 1);
      }

      setCurrentValue(newList);
      onChange?.(newList);
    } else {
      setCurrentValue(val);
      onChange?.(val);
    }
  }

  // format button display
  function buttonDisplay() {
    if (typeof currentValue === 'object') {
      const len = currentValue.length;
      if (len > 1) return `${currentValue[0]} +${len - 1} more`;
      return currentValue[0];
    }
    return currentValue;
  }

  return (
    <FilterDropdownContainer>
      <FilterDropdownButton
        $changed={
          multi
            ? currentValue.length > 0 && currentValue[0] !== defaultValue
            : defaultValue !== currentValue
        }
        onClick={() => setTimeout(() => setMenuShown(true), 0)}
      >
        {buttonDisplay()}
      </FilterDropdownButton>
      {menuShown && (
        <FilterDropdownMenu closeMenu={() => setMenuShown(false)}>
          {options.map(o => (
            <FilterDropdownOption
              key={o}
              onClick={() => handleOptionClick(o)}
              $selected={multi ? currentValue.includes(o) : o === currentValue}
            >
              {o}
            </FilterDropdownOption>
          ))}
        </FilterDropdownMenu>
      )}
    </FilterDropdownContainer>
  );
}
