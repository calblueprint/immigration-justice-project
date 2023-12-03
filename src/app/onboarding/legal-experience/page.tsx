'use client';

import { useContext, useState, useEffect, useCallback } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import TextInput from '@/components/TextInput';
import InputDropdown from '@/components/InputDropdown';
import RadioGroup from '@/components/RadioGroup';
import { ImmigrationLawExperienceEnum } from '@/types/schema';

const legalExperienceOptions = new Map<ImmigrationLawExperienceEnum, string>([
  ['HIGH', 'Multiple cases of immigration law experience'],
  ['MEDIUM', 'Few cases of immigration law experience'],
  ['LOW', 'One or no case of immigration law experience'],
]);

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [barNum, setBarNum] = useState('');
  const [registered, setRegistered] = useState('');
  const [barNumError, setBarNumError] = useState('');

  const isValidBarNumber = useCallback(
    (barNumber: string) =>
      !Number.isNaN(parseInt(barNumber, 10)) && /^\d{6, 8}$/.test(barNumber),
    [],
  );

  useEffect(() => {
    if (!onboarding) return;

    const barNumber = onboarding.profile.bar_number || '';
    const experience = onboarding.profile.immigration_law_experience;
    const isRegistered = onboarding.profile.eoir_registered;

    setBarNum(barNumber);
    if (isRegistered !== undefined)
      setRegistered(onboarding.profile.eoir_registered ? 'Yes' : 'No');

    if (
      isValidBarNumber(barNumber) &&
      experience &&
      isRegistered !== undefined
    ) {
      onboarding.setCanContinue(true);
    } else {
      onboarding.setProgress(3);
      onboarding.setCanContinue(false);
    }
  }, [onboarding, isValidBarNumber]);

  const handleBarNumChange = useCallback(
    (v: string) => {
      setBarNumError(isValidBarNumber(v) ? '' : 'Invalid bar number');
      onboarding?.updateProfile({ bar_number: v });
    },
    [onboarding, isValidBarNumber],
  );

  return (
    <>
      <H1>Legal Experience</H1>
      <TextInput
        label="What is your attorney bar number?"
        placeholder="123456"
        errorText={barNumError}
        type="text"
        id="barNum"
        value={barNum}
        setValue={setBarNum}
        onChange={v => handleBarNumChange(v)}
      />
      <InputDropdown
        label="What level of immigration law experience do you have?"
        onChange={v =>
          onboarding?.updateProfile({
            immigration_law_experience: v as ImmigrationLawExperienceEnum,
          })
        }
        defaultValue={onboarding?.profile.immigration_law_experience}
        options={legalExperienceOptions}
        error="" // "Must select your level of immigration law experience"
      />
      <RadioGroup
        name="registered"
        value={registered}
        setValue={setRegistered}
        options={['Yes', 'No']}
        label="Are you registered by the Executive Office of Immigration Review?"
        error=""
        onChange={v =>
          onboarding?.updateProfile({ eoir_registered: v === 'Yes' })
        }
      />
    </>
  );
}
