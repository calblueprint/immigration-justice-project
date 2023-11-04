'use client';

import { useState, useEffect, useRef } from 'react';
import { DropdownContainer, DropdownButton } from './styles';
import DropdownMenu from '../DropdownMenu';

export default function FilterDropdown({
  defaultValue,
  options,
  multi = false,
  onChange,
}: {
  defaultValue: string;
  options: Set<string>;
  multi?: boolean;
  onChange?: (name: string | Set<string>) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [menuShown, setMenuShown] = useState(false);
  const [currentValue, setCurrentValue] = useState<Set<string> | string>(
    multi ? new Set() : '',
  );

  // handle select option
  function handleOptionClick(val: string) {
    // multi-select
    if (typeof currentValue === 'object') {
      const copy = new Set(currentValue);

      if (copy.has(val)) copy.delete(val);
      else copy.add(val);

      setCurrentValue(copy);
      onChange?.(copy);

      // single-select
    } else {
      if (currentValue === val) {
        setCurrentValue('');
        onChange?.('');
        return;
      }

      setCurrentValue(val);
      onChange?.(val);
    }
  }

  // format button display
  function buttonDisplay() {
    if (typeof currentValue === 'object') {
      const len: number = currentValue.size;
      if (len === 0) return defaultValue;
      const firstVal: string = currentValue.values().next().value;
      if (len > 1) return `${firstVal} +${len - 1} more`;
      return firstVal;
    }

    if (!currentValue) return defaultValue;
    return currentValue;
  }

  // mount listener for closing dropdown menu
  useEffect(() => {
    function globalClickListener(e: Event) {
      if (container.current && container.current.contains(e.target as Node))
        return;
      setMenuShown(false);
    }

    document.addEventListener('click', globalClickListener);

    return () => {
      document.removeEventListener('click', globalClickListener);
    };
  }, []);

  return (
    <DropdownContainer ref={container}>
      <DropdownButton
        $changed={
          typeof currentValue === 'object'
            ? currentValue.size > 0
            : currentValue === ''
        }
        onClick={() => setTimeout(() => setMenuShown(!menuShown), 0)}
      >
        {buttonDisplay()}
      </DropdownButton>
      <DropdownMenu show={menuShown}>
        {Array.from(options).map(o => (
          <DropdownMenu.Item
            key={o}
            onClick={() => handleOptionClick(o)}
            $selected={
              typeof currentValue === 'object'
                ? currentValue.has(o)
                : o === currentValue
            }
          >
            {o}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
