import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { ComponentContainer, GroupContainer } from './styles';
import { RadioInput, RadioLabel } from '../InterestForm/styles';

interface DefaultRadioGroupProps {
  name: string;
  options: string[];
  label?: string;
  error?: string;
  defaultValue?: string;
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
      {label && <H4 $color={COLORS.greyDark}>{label}</H4>}
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
