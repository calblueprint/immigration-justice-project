'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { DropdownContainer, DropdownButton } from './styles';
import DropdownMenu from '../DropdownMenu';

interface CommonProps {
  options: Set<string>;
  defaultValue: string;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  value: Set<string>;
  onChange: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  value: string;
  onChange: (value: string) => void;
}

type FilterDropdownProps = SingleSelectProps | MultiSelectProps;

export default function FilterDropdown({
  options,
  multi,
  defaultValue,
  value,
  onChange,
}: FilterDropdownProps) {
  const container = useRef<HTMLDivElement>(null);
  const [menuShown, setMenuShown] = useState(false);
  const optionsArray = useMemo(() => Array.from(options), [options]);

  // handle select option
  function handleOptionClick(val: string) {
    // multi-select
    if (multi) {
      const copy = new Set(value);

      if (copy.has(val)) copy.delete(val);
      else copy.add(val);

      onChange(copy);

      // single-select
    } else if (value === val) {
      onChange('');
    } else {
      onChange(val);
    }
  }

  // format button display
  function buttonDisplay() {
    if (multi) {
      const len: number = value.size;
      if (len === 0) return defaultValue;
      const [firstVal] = value;
      if (len > 1) return `${firstVal} +${len - 1} more`;
      return firstVal;
    }

    if (!value) return defaultValue;
    return value;
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
        $changed={multi ? value.size > 0 : value === ''}
        onClick={() => setTimeout(() => setMenuShown(!menuShown), 0)}
      >
        {buttonDisplay()}
      </DropdownButton>
      <DropdownMenu show={menuShown}>
        {optionsArray.map(o => (
          <DropdownMenu.Item
            key={o}
            onClick={() => handleOptionClick(o)}
            $selected={multi ? value.has(o) : o === value}
          >
            {o}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
