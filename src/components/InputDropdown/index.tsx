'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DropdownContainer,
  DropdownInput,
  DropdownInputContainer,
  DropdownInputLabel,
  DropdownInputTag,
  TagContainer,
} from './styles';
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
  onChange?: (v: string | Set<string>) => void;
}) {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownInputRef = useRef<HTMLParagraphElement>(null);
  const [menuShown, setMenuShown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string | Set<string>>(
    multi ? new Set() : '',
  );

  // handle when a tag gets clicked
  function handleRemoveOption(option: string) {
    if (dropdownContainerRef.current) dropdownContainerRef.current.blur();
    if (dropdownInputRef.current) dropdownInputRef.current.blur();

    if (typeof currentValue === 'object') {
      if (!currentValue.has(option)) return;

      const copy = new Set(currentValue);
      copy.delete(option);
      setCurrentValue(copy);
      onChange?.(copy);
    } else {
      setCurrentValue('');
      onChange?.('');
    }
  }

  // decide add/remove options
  function handleOptionSelect(option: string) {
    if (typeof currentValue === 'object') {
      const copy = new Set(currentValue);

      if (currentValue.has(option)) copy.delete(option);
      else copy.add(option);

      setCurrentValue(copy);
      onChange?.(copy);
    } else if (currentValue === option) {
      setCurrentValue('');
      onChange?.('');
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

  // helper to hide menu and clear text
  function hideMenu() {
    setMenuShown(false);
    if (dropdownInputRef.current) dropdownInputRef.current.innerText = '';
    setInputValue('');
  }

  return (
    <DropdownContainer ref={dropdownContainerRef} onBlur={() => hideMenu()}>
      <DropdownInputLabel as="label" htmlFor={id}>
        {label}
      </DropdownInputLabel>
      <DropdownInputContainer
        as="div"
        $error={false}
        onMouseDown={e => {
          e.preventDefault();
          if (dropdownInputRef.current) dropdownInputRef.current.focus();
        }}
      >
        <TagContainer>
          {typeof currentValue === 'object' ? (
            Array.from(currentValue).map(v => (
              <DropdownInputTag
                key={v}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleRemoveOption(v)}
              >
                {v}
              </DropdownInputTag>
            ))
          ) : (
            <p>{currentValue}</p>
          )}
        </TagContainer>
        <DropdownInput
          id={id}
          ref={dropdownInputRef}
          $placeholder={placeholder}
          $hidden={!menuShown}
          onFocus={() => setTimeout(() => setMenuShown(true), 0)}
          onInput={() =>
            dropdownInputRef.current &&
            setInputValue(dropdownInputRef.current.innerText.toLowerCase())
          }
          contentEditable
        />
      </DropdownInputContainer>
      <DropdownMenu show={menuShown}>
        {Array.from(options)
          .filter(o => o.toLowerCase().includes(inputValue))
          .map(o => (
            <DropdownMenu.Item
              key={o}
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleOptionSelect(o)}
              onKeyUp={e => e.key === 'Enter' && handleOptionSelect(o)}
              $selected={
                typeof currentValue === 'object'
                  ? currentValue.has(o)
                  : currentValue === o
              }
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
