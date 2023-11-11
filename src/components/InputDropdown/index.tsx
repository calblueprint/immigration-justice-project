'use client';

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from 'react';
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

interface CommonProps {
  placeholder?: string;
  error?: string;
  label: string;
  options: Set<string>;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  value: Set<string>;
  setValue: Dispatch<SetStateAction<Set<string>>>;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

type InputDropdownProps = MultiSelectProps | SingleSelectProps;

export default function InputDropdown({
  placeholder,
  error = '',
  label,
  options,
  multi,
  value,
  setValue,
}: InputDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<Map<string, HTMLParagraphElement | null>>(new Map());
  const [focusIndex, setFocusIndex] = useState(-1);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // store array format for focus indexing
  const optionsArray = useMemo(
    () =>
      Array.from(new Set(options)).filter(o =>
        o.toLowerCase().includes(inputValue),
      ),
    [options, inputValue],
  );

  // detect clicking outside of menu box
  useEffect(() => {
    function globalClickEvent(this: Document, e: MouseEvent) {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node)
      )
        return;
      setMenuVisible(false);
    }

    document.addEventListener('click', globalClickEvent);

    return () => {
      document.removeEventListener('click', globalClickEvent);
    };
  }, []);

  // handle when a tag gets clicked
  function handleRemoveOption(option: string) {
    if (containerRef.current) containerRef.current.blur();
    if (inputRef.current) inputRef.current.blur();

    if (multi) {
      if (!value.has(option)) return;

      const copy = new Set(value);
      copy.delete(option);
      setValue(copy);
    } else {
      setValue('');
    }
  }

  // decide add/remove options
  function handleSelectOption(option: string) {
    if (inputRef.current) inputRef.current.innerHTML = '';

    if (multi) {
      const copy = new Set(value);

      if (value.has(option)) copy.delete(option);
      else copy.add(option);

      setValue(copy);
    } else if (value === option) {
      setValue('');
    } else {
      setValue(option);
    }
  }

  // handle keyboard navigation
  function handleKeyDown(e: KeyboardEvent) {
    // navigate dropdown options
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const opt = optionsArray[focusIndex];
      itemsRef.current.get(opt)?.scrollIntoView({ block: 'center' });

      const idx = Math.min(
        Math.max(e.key === 'ArrowDown' ? focusIndex + 1 : focusIndex - 1, 0),
        optionsArray.length - 1,
      );
      setFocusIndex(idx);

      // select/unselect dropdown option
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (focusIndex < 0 || focusIndex >= optionsArray.length) return;
      const opt = optionsArray[focusIndex];
      handleSelectOption(opt);

      // remove last selected option
    } else if (e.key === 'Backspace') {
      if (inputRef.current && inputRef.current.innerText === '')
        setInputValue('');
      if (inputValue) return;

      if (multi) {
        if (value.size === 0) return;

        const currentArr = Array.from(value);
        currentArr.splice(currentArr.length - 1, 1);
        setValue(new Set(currentArr));
      } else {
        setValue('');
      }
    }
  }

  // helper to hide menu and clear text
  function hideMenu() {
    setMenuVisible(false);
    if (inputRef.current) inputRef.current.innerText = '';
    setInputValue('');
  }

  return (
    <DropdownContainer ref={containerRef} onBlur={() => hideMenu()}>
      <DropdownInputLabel
        as="label"
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {label}
      </DropdownInputLabel>
      <DropdownInputContainer
        as="div"
        $error={error !== ''}
        $focused={menuVisible}
        $empty={multi ? value.size === 0 : !value}
        onMouseDown={e => {
          e.preventDefault();
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        <TagContainer>
          {multi
            ? Array.from(value).map(v => (
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
            : value && <p>{value}</p>}
        </TagContainer>
        <DropdownInput
          ref={inputRef}
          $placeholder={(multi ? value.size > 0 : value) ? '' : placeholder}
          $hidden={!menuVisible}
          onFocus={() => setTimeout(() => setMenuVisible(true), 0)}
          onInput={() => {
            if (inputRef.current)
              setInputValue(inputRef.current.innerText.toLowerCase());
            setFocusIndex(-1);
          }}
          onKeyDown={e => handleKeyDown(e)}
          contentEditable
        />
        <DropdownMenu show={menuVisible} onMouseLeave={() => setFocusIndex(-1)}>
          {optionsArray.map((o, i) => (
            <DropdownMenu.Item
              key={o}
              ref={el => itemsRef.current.set(o, el)}
              onMouseDown={e => e.preventDefault()}
              onClick={() => {
                handleSelectOption(o);
                setFocusIndex(i);
              }}
              onMouseMove={() => {
                setFocusIndex(i);
              }}
              onKeyUp={e => e.key === 'Enter' && handleSelectOption(o)}
              $selected={multi ? value.has(o) : value === o}
              $forceFocus={focusIndex === i}
              $disableMouseFocus
            >
              {o}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu>
      </DropdownInputContainer>
      {error && <DropdownErrorText>{error}</DropdownErrorText>}
    </DropdownContainer>
  );
}

/**
 * EXAMPLE USAGE:
 * app/test-page/page.tsx
 * 

'use client';

import { useState } from 'react';
import InputDropdown from '@/components/InputDropdown';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;
  box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  width: 33.75rem;
`;

export default function Page() {
  const [fruits, setFruits] = useState(new Set<string>());
  const [writingUtensil, setWritingUtensil] = useState('');

  return (
    <ContainerDiv>
      <Box>
        <InputDropdown
          label="Fruits"
          placeholder="Apple"
          multi
          value={fruits}
          setValue={setFruits}
          options={
            new Set([
              'Apple',
              'Banana',
              'Cherry',
              'Date',
              'Elderberry',
              'Fig',
              'Grape',
              'Honeydew',
              'Imbe',
              'Jackfruit',
              'Kiwi',
              'Lime',
              'Mango',
              'Nectarine',
              'Orange',
              'Pineapple',
              'Quince',
              'Raspberry',
              'Strawberry',
              'Tomato',
              'Vanilla Bean',
              'Watermelon',
              'Zucchini',
            ])
          }
        />
        <InputDropdown
          label="Writing Utensil"
          placeholder="Pen"
          value={writingUtensil}
          setValue={setWritingUtensil}
          options={
            new Set([
              'Pen',
              'Pencil',
              'Mechanical Pencil',
              'Chalk',
              'Etch A Sketch',
              'Quill',
              'Mouse',
            ])
          }
        />
      </Box>
    </ContainerDiv>
  );
}

 */
