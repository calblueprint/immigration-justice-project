'use client';

import { useState, useEffect, useRef, useMemo, KeyboardEvent } from 'react';
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
  const itemsRef = useRef<Map<string, HTMLParagraphElement | null>>(new Map());
  const [menuVisible, setMenuVisible] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const optionsArray = useMemo(() => Array.from(options), [options]);

  // mount listener for closing dropdown menu
  useEffect(() => {
    function globalClickListener(e: Event) {
      if (container.current && container.current.contains(e.target as Node))
        return;
      setMenuVisible(false);
    }

    document.addEventListener('click', globalClickListener);

    return () => {
      document.removeEventListener('click', globalClickListener);
    };
  }, []);

  // handle select option
  function handleSelectOption(val: string) {
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

  // keyboard navigation
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const opt = optionsArray[focusIndex];
      itemsRef.current.get(opt)?.scrollIntoView({ block: 'center' });

      const idx = Math.min(
        Math.max(e.key === 'ArrowDown' ? focusIndex + 1 : focusIndex - 1, 0),
        optionsArray.length - 1,
      );
      setFocusIndex(idx);
    } else if (e.key === 'Enter' && menuVisible && focusIndex !== -1) {
      e.preventDefault();

      if (focusIndex < 0 || focusIndex >= optionsArray.length) return;
      const opt = optionsArray[focusIndex];
      handleSelectOption(opt);
    } else if (e.key === 'Escape') {
      setMenuVisible(false);
      setFocusIndex(-1);
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

  return (
    <DropdownContainer ref={container} onBlur={() => setMenuVisible(false)}>
      <DropdownButton
        $changed={multi ? value.size > 0 : value === ''}
        onClick={() => setTimeout(() => setMenuVisible(!menuVisible), 0)}
        onKeyDown={e => handleKeyDown(e)}
      >
        {buttonDisplay()}
      </DropdownButton>
      <DropdownMenu show={menuVisible}>
        {optionsArray.map((o, i) => (
          <DropdownMenu.Item
            key={o}
            ref={el => itemsRef.current.set(o, el)}
            onClick={() => handleSelectOption(o)}
            onMouseDown={e => e.preventDefault()}
            onMouseOver={() => setFocusIndex(i)}
            $selected={multi ? value.has(o) : value === o}
            $forceFocus={focusIndex === i}
            $disableMouseFocus
          >
            {o}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
