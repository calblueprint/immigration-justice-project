'use client';

import { useState, useEffect, useRef } from 'react';
import { DropdownContainer, DropdownInput, DropdownInputLabel } from './styles';
import DropdownMenu from '../DropdownMenu';

export default function InputDropdown({
  id,
  placeholder,
  label,
  options,
  multi = false,
  onChange,
}: {
  id: string;
  placeholder?: string;
  label: string;
  options: Set<string>;
  multi?: boolean;
  onChange?: (v: string | string[]) => void;
}) {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownInputRef = useRef<HTMLInputElement>(null);
  const [menuShown, setMenuShown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string | string[]>(
    multi ? [] : '',
  );

  // decide add/remove options
  function handleOptionSelect(option: string) {
    if (typeof currentValue === 'object') {
      const newList = currentValue.includes(option)
        ? currentValue.filter(v => v !== option)
        : [...currentValue, option];

      setCurrentValue(newList);
      onChange?.(newList);
    } else {
      setCurrentValue(option);
      onChange?.(option);
    }
  }

  // detect clicking outside of menu box
  useEffect(() => {
    function globalClickEvent(this: Document, e: MouseEvent) {
      if (
        dropdownContainerRef.current &&
        dropdownContainerRef.current.contains(e.target as Node)
      )
        return;
      setMenuShown(false);
    }

    document.addEventListener('click', globalClickEvent);

    return () => {
      document.removeEventListener('click', globalClickEvent);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownContainerRef}>
      <DropdownInputLabel as="label" htmlFor={id}>
        {label}
      </DropdownInputLabel>
      <DropdownInput
        as="input"
        type="text"
        ref={dropdownInputRef}
        id={id}
        $error={false}
        placeholder={placeholder}
        onFocus={() => setTimeout(() => setMenuShown(true), 0)}
        // onBlur={() => setMenuShown(false)}
        onChange={e => setInputValue(e.target.value.toLowerCase())}
      />
      <DropdownMenu show={menuShown}>
        {Array.from(options)
          .filter(o => o.toLowerCase().match(inputValue))
          .map(o => (
            <DropdownMenu.Item
              key={o}
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleOptionSelect(o)}
              onKeyUp={e => e.key === 'Enter' && handleOptionSelect(o)}
              tabIndex={0}
              $selected={multi ? currentValue.includes(o) : currentValue === o}
            >
              {o}
            </DropdownMenu.Item>
          ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}

/**
 * EXAMPLE USAGE:
 * app/test-page/page.tsx
 * 

'use client';

import React from 'react';
import styled from 'styled-components';
import InputDropdown from '@/components/Dropdowns/InputDropdown';

// styling
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const CenterBox = styled.div`
  margin-bottom: 1rem;
  border: 1px solid black;
  display: grid;
  place-items: center;
  border-radius: 0.25rem;
  padding: 5rem;
  gap: 2rem;
`;

export default function page() {
  return (
    <Container>
      <CenterBox>
        <InputDropdown
          id="single-dropdown"
          label="Favorite Fruit"
          options={[
            'Apple',
            'Banana',
            'Citrus',
            'Apricot',
            'Peach',
            'Cherry',
            'Pineapple',
          ]}
          placeholder="Favorite Fruit"
        />
        <InputDropdown
          id="multi-dropdown"
          label="Writing Utensils"
          multi
          options={[
            'Crayon',
            'Pencil',
            'Pen',
            'Mechanical Pencil',
            'Stylus',
            'Paintbrush',
          ]}
          placeholder="Writing utensils"
        />
      </CenterBox>
    </Container>
  );
}

 */
