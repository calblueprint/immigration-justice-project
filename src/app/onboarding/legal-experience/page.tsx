'use client';

import { useContext, useState, useEffect } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import TextInput from '@/components/TextInput';
import InputDropdown from '@/components/InputDropdown';
import RadioGroup from '@/components/RadioGroup';
import { ImmigrationLawExperienceEnum, Profile } from '@/types/schema';

const ExperienceTypes = new Set([
  'Multiple cases of immigration law experience',
  'Few cases of immigration law experience',
  'One or no case of immigration law experience',
]);

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [barNum, setBarNum] = useState('');
  const [experience, setExperience] =
    useState<ImmigrationLawExperienceEnum | null>(null);
  const [registered, setRegistered] = useState('');

  const getErrorText = () => {
    if (barNum !== '' && (!/^\d+$/.test(barNum) || barNum.length !== 6)) {
      return 'Must include attorney bar number';
    }
    return '';
  };

  useEffect(() => {
    if (barNum !== '' && experience !== null && registered !== '') {
      // update profile
      const partialProfile: Partial<Profile> = {
        bar_number: barNum,
        immigration_law_experience: experience,
        eoir_registered: registered === 'Yes',
      };
      onboarding?.updateProfile(partialProfile);
      // enable continue
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setCanContinue(false);
    }
  }, [barNum, experience, registered]);

  return (
    <>
      <H1>Legal Experience</H1>
      <TextInput
        label="What is your attorney bar number?"
        placeholder="123456"
        errorText={getErrorText()}
        type="text"
        id="barNum"
        value={barNum}
        setValue={setBarNum}
      />
      <InputDropdown
        label="What level of immigration law experience do you have?"
        onChange={v => setExperience(v as ImmigrationLawExperienceEnum)}
        options={ExperienceTypes}
        error="" // "Must select your level of immigration law experience"
      />
      <RadioGroup
        name="registered"
        value={registered}
        setValue={setRegistered}
        options={['Yes', 'No']}
        label="Are you registered by the Executive Office of Immigration Review?"
        error=""
      />
    </>
  );
}
