'use client';

import React, { useCallback, useId, useMemo } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { DropdownOption } from '@/types/dropdown';
import { DropdownLabel, DropdownWrapper } from './styles';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: Set<string> | Map<string, string>;
  placeholder: string;
  label: string;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: string | null) => void;
}

type FilterDropdownProps = SingleSelectProps | MultiSelectProps;

export default function InputDropdown({
  label,
  options,
  placeholder,
  onChange,
  multi,
}: FilterDropdownProps) {
  const optionsArray = useMemo(
    () =>
      options instanceof Set
        ? Array.from(options).map(v => ({ label: v, value: v }))
        : Array.from(options.entries()).map(([k, v]) => ({
            value: k,
            label: v,
          })),
    [options],
  );

  const handleChange = useCallback(
    (newValue: MultiValue<DropdownOption> | SingleValue<DropdownOption>) => {
      if (multi && newValue instanceof Array) {
        onChange?.(new Set(newValue.map(v => v.value)));
      } else if (!multi && !(newValue instanceof Array)) {
        onChange?.(newValue ? newValue.value : null);
      } else {
        throw new Error('An unexpected error occurred!');
      }
    },
    [multi, onChange],
  );

  return (
    <DropdownWrapper>
      <DropdownLabel>{label}</DropdownLabel>
      <Select
        instanceId={useId()}
        options={optionsArray}
        placeholder={placeholder}
        isMulti={multi}
        onChange={newValue => handleChange(newValue)}
      />
    </DropdownWrapper>
  );
}

/**
 * EXAMPLE USAGE
 * 
 * src/app/test/page.tsx:

'use client';

import InputDropdown from '@/components/InputDropdown';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  padding-bottom: 4rem;
`;

const Box = styled.div`
  width: 25rem;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.2);
`;

export default function Page() {
  return (
    <Container>
      <Box>
        <InputDropdown
          label="Natural Disasters"
          placeholder="Hurricane"
          multi
          options={
            new Set([
              'Hurricane',
              'Tornado',
              'Tsunami',
              'Earthquake',
              'Wildfire',
              'Pandemic',
              'Flood',
              'Blizzard',
              'Avalanche',
              'Cyclone',
              'Landslide',
              'Volcanic Eruption',
            ])
          }
        />
      </Box>
    </Container>
  );
}

 */
