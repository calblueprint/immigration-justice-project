import React, { Dispatch, SetStateAction, useCallback } from 'react';
import COLORS from '@/styles/colors';
import { InputLabel, P } from '@/styles/text';
import { RadioInput, RadioLabel } from '../InterestForm/styles';
import { ComponentContainer, GroupContainer } from './styles';

interface DefaultRadioGroupProps {
  name: string;
  options: string[];
  label?: string;
  error?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (s: string) => void;
}

interface ControlledRadioGroupProps extends DefaultRadioGroupProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface UncontrolledRadioGroupProps extends DefaultRadioGroupProps {
  value?: never;
  setValue?: never;
}

type RadioGroupProps = ControlledRadioGroupProps | UncontrolledRadioGroupProps;

export default function RadioGroup({
  value,
  required = false,
  name,
  setValue,
  options,
  label,
  defaultValue,
  error = '',
  onChange,
}: RadioGroupProps) {
  const handleChange = useCallback(
    (s: string) => {
      setValue?.(s);
      onChange?.(s);
    },
    [setValue, onChange],
  );

  return (
    <ComponentContainer>
      {label && (
        <InputLabel $color={COLORS.greyDark} $required={required}>
          {label}
        </InputLabel>
      )}
      <GroupContainer>
        {options.map(o => (
          <RadioLabel key={o} htmlFor={o}>
            <RadioInput
              type="radio"
              id={o}
              name={name}
              value={value}
              checked={value ? value === o : undefined}
              defaultChecked={defaultValue === o}
              onChange={() => handleChange(o)}
            />
            {o}
          </RadioLabel>
        ))}
      </GroupContainer>
      {error && <P $color={COLORS.redMid}>{error}</P>}
    </ComponentContainer>
  );
}
