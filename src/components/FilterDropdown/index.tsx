'use client';

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import DropdownMenu from '../DropdownMenu';
import { DropdownButton, DropdownContainer } from './styles';

// for map: keys are the actual values stored, values are the displayed value
interface CommonProps {
  options: Set<string> | Map<string, string>;
  placeholder: string;
  fullText?: string;
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
  placeholder,
  fullText = '',
  value,
  onChange,
}: FilterDropdownProps) {
  const container = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLParagraphElement | null>>(new Map());
  const [menuVisible, setMenuVisible] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const optionsArray = useMemo(() => Array.from(options.keys()), [options]);

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
  const handleSelectOption = (val: string) => {
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
  };

  // keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    // options navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const opt = optionsArray[focusIndex];
      itemsRef.current.get(opt)?.scrollIntoView({ block: 'center' });

      const idx = Math.min(
        Math.max(e.key === 'ArrowDown' ? focusIndex + 1 : focusIndex - 1, 0),
        optionsArray.length - 1,
      );
      setFocusIndex(idx);

      // select option
    } else if (e.key === 'Enter' && menuVisible && focusIndex !== -1) {
      e.preventDefault();

      if (focusIndex < 0 || focusIndex >= optionsArray.length) return;
      const opt = optionsArray[focusIndex];
      handleSelectOption(opt);

      // close dropdown
    } else if (e.key === 'Escape') {
      setMenuVisible(false);
      setFocusIndex(-1);
    }
  };

  // format button display
  const buttonDisplay = () => {
    if (multi) {
      const len = value.size;
      if (len === 0) return placeholder;

      const [first] = value;
      const firstVal = options instanceof Map ? options.get(first) : first;

      if (fullText && len === options.size) return fullText;

      return len > 1 ? `${firstVal} +${len - 1} more` : firstVal;
    }

    return value || placeholder;
  };

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
        {Array.from(options.entries()).map(([k, v], i) => (
          <DropdownMenu.Item
            key={k}
            ref={el => itemsRef.current.set(k, el)}
            onClick={() => handleSelectOption(k)}
            onMouseDown={e => e.preventDefault()}
            onMouseOver={() => setFocusIndex(i)}
            $selected={multi ? value.has(k) : value === k}
            $forceFocus={focusIndex === i}
            $multi={multi}
            $disableMouseFocus
          >
            {v}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
