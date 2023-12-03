import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { ComponentContainer, GroupContainer } from './styles';
import { RadioInput, RadioLabel } from '../InterestForm/styles';

export default function RadioGroup({
  value,
  name,
  setValue,
  options,
  label,
  error = '',
  onChange,
}: {
  value: string;
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
      <H4 $color={COLORS.greyDark}>{label}</H4>
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
