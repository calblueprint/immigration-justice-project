import COLORS from '@/styles/colors';
import { InputLabel, P } from '@/styles/text';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { RadioInput, RadioLabel } from '../InterestForm/styles';
import { ComponentContainer, GroupContainer } from './styles';

export default function RadioGroup({
  value,
  required = false,
  name,
  setValue,
  options,
  label,
  error = '',
  onChange,
}: {
  value: string;
  required?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
  onChange?: (s: string) => void;
  name: string;
  options: string[];
  label: string;
  error?: string;
}) {
  const handleChange = useCallback(
    (s: string) => {
      setValue(s);
      onChange?.(s);
    },
    [setValue, onChange],
  );

  return (
    <ComponentContainer>
      <InputLabel $color={COLORS.greyDark} $required={required}>
        {label}
      </InputLabel>
      <GroupContainer>
        {options.map(o => (
          <RadioLabel key={o} htmlFor={o}>
            <RadioInput
              type="radio"
              id={o}
              name={name}
              value={value}
              checked={value === o}
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
