'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DropdownContainer,
  DropdownInput,
  DropdownInputLabel,
  DropdownItem,
  DropdownMenu,
} from './styles';

export default function InputDropdown({
  id,
  placeholder,
  label,
  options,
  multi = false,
  onChange,
}: {
  id: string;
  placeholder: string;
  label: string;
  options: string[];
  multi?: boolean;
  onChange?: (v: string | string[]) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [menuShown, setMenuShown] = useState(false);
  const [currentValue, setCurrentValue] = useState<string | string[]>(
    multi ? [] : '',
  );

  // decide add/remove options
  function handleOptionClick(option: string) {
    if (typeof currentValue === 'object') {
      if (currentValue.includes(option)) return;

      const newList = [...currentValue, option];
      setCurrentValue(newList);
      onChange?.(newList);
    } else {
      setCurrentValue(option);
      onChange?.(option);
    }
  }

  // detect clicking outside of menu box
  useEffect(() => {
    function globalClickEvent(e: Event) {
      if (container.current && container.current.contains(e.target as Node))
        return;
      setMenuShown(false);
    }

    document.addEventListener('click', globalClickEvent);

    return () => {
      document.removeEventListener('click', globalClickEvent);
    };
  }, []);

  return (
    <DropdownContainer ref={container}>
      <DropdownInputLabel htmlFor={id}>{label}</DropdownInputLabel>
      <DropdownInput
        type="text"
        id={id}
        $error={false}
        placeholder={placeholder}
        onFocus={() => setTimeout(() => setMenuShown(!menuShown), 0)}
      />
      <DropdownMenu $show={menuShown}>
        {options.map(o => (
          <DropdownItem
            key={o}
            onClick={() => handleOptionClick(o)}
            $selected={multi ? currentValue.includes(o) : currentValue === o}
          >
            {o}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
