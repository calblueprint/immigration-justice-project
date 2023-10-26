'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DropdownContainer,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from './styles';

export default function ButtonDropdown({
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
  const menu = useRef<HTMLDivElement>(null);
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

  // mount listener for closing dropdown menu
  useEffect(() => {
    function globalClickListener(e: Event) {
      if (menu.current && menu.current.contains(e.target as Node)) return;
      setMenuShown(false);
    }

    document.addEventListener('click', globalClickListener);

    return () => {
      document.removeEventListener('click', globalClickListener);
    };
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton
        $changed={
          multi
            ? currentValue.length > 0 && currentValue[0] !== defaultValue
            : defaultValue !== currentValue
        }
        onClick={() => setTimeout(() => setMenuShown(!menuShown), 0)}
      >
        {buttonDisplay()}
      </DropdownButton>
      <DropdownMenu $show={menuShown} ref={menu}>
        {options.map(o => (
          <DropdownItem
            key={o}
            onClick={() => handleOptionClick(o)}
            $selected={multi ? currentValue.includes(o) : o === currentValue}
          >
            {o}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
