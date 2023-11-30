'use client';

import { useCallback, useId, useMemo } from 'react';
import Select, {
  MenuProps,
  MultiValue,
  SingleValue,
  components,
} from 'react-select';
import { DropdownOption } from '@/types/dropdown';
import { P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { AnimatedWrapper, DropdownStyles, DropdownWrapper } from './styles';
import { ErrorText, InputLabel } from '../TextInput/styles';

// for map: key is actual data stored, value is displayed
interface CommonProps {
  options: Set<string> | Map<string, string>;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

interface MultiSelectProps extends CommonProps {
  multi: true;
  onChange?: (value: Set<string>) => void;
}

interface SingleSelectProps extends CommonProps {
  multi?: false;
  onChange?: (value: string | null) => void;
}

type InputDropdownProps = SingleSelectProps | MultiSelectProps;

// custom components
function NoOptionsMessage() {
  return <P $color={COLORS.greyMid}>No matches found</P>;
}

function AnimatedMenu(props: MenuProps<DropdownOption>) {
  return (
    <AnimatedWrapper>
      <components.Menu {...props} />
    </AnimatedWrapper>
  );
}

// main dropdown component
export default function InputDropdown({
  label,
  options,
  placeholder = '',
  error = '',
  disabled,
  required,
  onChange,
  multi,
}: InputDropdownProps) {
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
      <InputLabel>{label}</InputLabel>
      <Select
        components={{ Menu: AnimatedMenu }}
        isClearable
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        hideSelectedOptions={false}
        noOptionsMessage={NoOptionsMessage}
        unstyled
        required={required}
        isDisabled={disabled}
        styles={DropdownStyles(multi, error !== '')}
        instanceId={useId()}
        options={optionsArray}
        placeholder={placeholder}
        isMulti={multi}
        onChange={handleChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </DropdownWrapper>
  );
}

/**
 * EXAMPLE USAGE
 * 
 * Note: data for options should be stored in a constant variable
 *  OUTSIDE of the function component, or in a useState/useRef.
 * 
 * src/app/test/page.tsx:

'use client';

import BigButton from '@/components/BigButton';
import InputDropdown from '@/components/InputDropdown';
import { P } from '@/styles/text';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4rem 0;
`;

const Box = styled.div`
  width: 31.25rem;
  padding: 4rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const elementOptions = new Set([
  'Argon',
  'Berkelium',
  'Carbon',
  'Darmstadtium',
  'Einsteinium',
  'Fluorine',
  'Gold',
  'Helium',
  'Iron',
  'Krypton',
  'Lithium',
  'Magnesium',
  'Neon',
  'Oxygen',
  'Phosphorus',
  'Radium',
  'Silicon',
  'Titanium',
  'Uranium',
  'Vanadium',
  'Xenon',
  'Ytterbium',
  'Zinc',
]);

const disasterOptions = new Set([
  'Avalanche',
  'Blizzard',
  'Cyclone',
  'Drought',
  'Earthquake',
  'Flood',
  'Hurricane',
  'Ice storm',
  'Landslide',
  'Pandemic',
  'Ragnorak',
  'Sinkhole',
  'Tsunami',
  'Volcanic Eruption',
  'Wildfire',
]);

const emptyOptions = new Set([]);

export default function Page() {
  const [elements, setElements] = useState<Set<string>>(new Set());
  const [disaster, setDisaster] = useState<string | null>(null);
  const [valuesVisible, setValuesVisible] = useState<boolean>(false);

  useEffect(() => {
    if (elements.size === 0 || !disaster) setValuesVisible(false);
  }, [elements, disaster]);

  return (
    <Container>
      <Box>
        <InputDropdown
          label="Elements"
          placeholder="Nitrogen"
          multi
          onChange={v => setElements(v)}
          options={elementOptions}
        />
        <InputDropdown
          label="Natural Disaster"
          placeholder="Hurricane"
          error="Insufficient funds"
          onChange={v => setDisaster(v)}
          options={disasterOptions}
        />
        <InputDropdown label="Pandora's Box" disabled options={emptyOptions} />
        {valuesVisible && (
          <P>
            {Array.from(elements).join(', ')} {disaster}
          </P>
        )}
        <BigButton
          disabled={elements.size === 0 || !disaster}
          onClick={() => setValuesVisible(!valuesVisible)}
        >
          {valuesVisible ? <>Hide Values</> : <>Check Values</>}
        </BigButton>
      </Box>
    </Container>
  );
}

 */
