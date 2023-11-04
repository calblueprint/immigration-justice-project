'use client';

import { useState, useEffect, useRef, useMemo, KeyboardEvent } from 'react';
import {
  DropdownErrorText,
  DropdownInput,
  DropdownInputContainer,
  DropdownInputLabel,
  DropdownInputTag,
  TagContainer,
} from './styles';
import DropdownMenu from '../DropdownMenu';
import { DropdownContainer } from '../FilterDropdown/styles';

export default function InputDropdown({
  id,
  placeholder,
  error = '',
  label,
  options,
  multi = false,
  onChange,
}: {
  id: string;
  placeholder?: string;
  error?: string;
  label: string;
  options: Set<string>;
  multi?: boolean;
  onChange?: (v: string | Set<string>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<Map<string, HTMLParagraphElement | null>>(new Map());
  const [focusIndex, setFocusIndex] = useState(-1);
  const [menuShown, setMenuShown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string | Set<string>>(
    multi ? new Set() : '',
  );

  const optionsArray = useMemo(
    () => Array.from(options).filter(o => o.toLowerCase().includes(inputValue)),
    [options, inputValue],
  );

  // handle when a tag gets clicked
  function handleRemoveOption(option: string) {
    if (containerRef.current) containerRef.current.blur();
    if (inputRef.current) inputRef.current.blur();

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

  // handle keyboard navigation
  function handleInputKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const idx = Math.min(
        Math.max(e.key === 'ArrowDown' ? focusIndex + 1 : focusIndex - 1, 0),
        options.size - 1,
      );

      const opt = optionsArray[focusIndex];
      itemsRef.current.get(opt)?.scrollIntoView({ block: 'center' });

      setFocusIndex(idx);
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (focusIndex < 0 || focusIndex >= optionsArray.length) return;
      const opt = optionsArray[focusIndex];
      handleOptionSelect(opt);
    } else if (e.key === 'Backspace') {
      if (inputValue !== '') return;

      if (typeof currentValue === 'object') {
        if (currentValue.size === 0) return;

        const currentArr = Array.from(currentValue);
        currentArr.splice(currentArr.length - 1, 1);
        setCurrentValue(new Set(currentArr));
      } else {
        setCurrentValue('');
      }
    }
  }

  // detect clicking outside of menu box
  useEffect(() => {
    function globalClickEvent(this: Document, e: MouseEvent) {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node)
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
    if (inputRef.current) inputRef.current.innerText = '';
    setInputValue('');
  }

  return (
    <DropdownContainer ref={containerRef} onBlur={() => hideMenu()}>
      <DropdownInputLabel as="label" htmlFor={id}>
        {label}
      </DropdownInputLabel>
      <DropdownInputContainer
        as="div"
        $error={error !== ''}
        $focused={menuShown}
        $empty={
          typeof currentValue === 'object'
            ? currentValue.size === 0
            : !currentValue
        }
        onMouseDown={e => {
          e.preventDefault();
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        <TagContainer>
          {typeof currentValue === 'object'
            ? Array.from(currentValue).map(v => (
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
            : currentValue && <p>{currentValue}</p>}
        </TagContainer>
        <DropdownInput
          id={id}
          ref={inputRef}
          $placeholder={
            (
              typeof currentValue === 'object'
                ? currentValue.size > 0
                : currentValue
            )
              ? ''
              : placeholder
          }
          $hidden={!menuShown}
          onFocus={() => setTimeout(() => setMenuShown(true), 0)}
          onInput={() => {
            if (inputRef.current)
              setInputValue(inputRef.current.innerText.toLowerCase());
            setFocusIndex(-1);
          }}
          onKeyDown={e => handleInputKey(e)}
          contentEditable
        />
      </DropdownInputContainer>
      <DropdownMenu show={menuShown}>
        {optionsArray.map((o, i) => (
          <DropdownMenu.Item
            key={o}
            ref={el => itemsRef.current.set(o, el)}
            onMouseDown={e => e.preventDefault()}
            onClick={() => {
              handleOptionSelect(o);
              setFocusIndex(i);
            }}
            onKeyUp={e => e.key === 'Enter' && handleOptionSelect(o)}
            $selected={
              typeof currentValue === 'object'
                ? currentValue.has(o)
                : currentValue === o
            }
            $focus={focusIndex === i}
          >
            {o}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
      {error && <DropdownErrorText>{error}</DropdownErrorText>}
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
