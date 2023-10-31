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
  const [inputValue, setInputValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string | string[]>(
    multi ? [] : '',
  );

  // decide add/remove options
  function handleOptionClick(option: string) {
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
        onFocus={() => setTimeout(() => setMenuShown(true), 0)}
        onChange={e => setInputValue(e.target.value.toLowerCase())}
      />
      <DropdownMenu $show={menuShown}>
        {options
          .filter(o => o.toLowerCase().includes(inputValue))
          .map(o => (
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

/**
 * EXAMPLE USAGE:
 * app/test-page/page.tsx
 * 
 * NOTE: TextInput is imported because Next.js does not want to render
 *       the styles for some reason.

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