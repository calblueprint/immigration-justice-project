'use client';

import { useContext, useState, useEffect } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import TextInput from '@/components/TextInput';
import InputDropdown from '@/components/InputDropdown';
import RadioGroup from '@/components/RadioGroup';
import { ImmigrationLawExperienceEnum, Profile } from '@/types/schema';

const legalExperienceOptions = new Map<ImmigrationLawExperienceEnum, string>([
  ['HIGH', 'Multiple cases of immigration law experience'],
  ['MEDIUM', 'Few cases of immigration law experience'],
  ['LOW', 'One or no case of immigration law experience'],
]);

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [barNum, setBarNum] = useState('');
  const [experience, setExperience] =
    useState<ImmigrationLawExperienceEnum | null>(null);
  const [registered, setRegistered] = useState('');

  useEffect(() => {
    setBarNum(onboarding?.profile.bar_number || '');
    setExperience(onboarding?.profile.immigration_law_experience || null);

    if (onboarding?.profile.eoir_registered !== undefined) {
      setRegistered(onboarding?.profile.eoir_registered ? 'Yes' : 'No');
    }
  }, []);

  const validBarNum = () =>
    !Number.isNaN(parseInt(barNum, 10)) && barNum.length === 6;

  const getErrorText = () => {
    if (barNum !== '' && !validBarNum()) {
      return 'Invalid bar number';
    }
    return '';
  };

  useEffect(() => {
    if (validBarNum() && experience !== null && registered !== '') {
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
        defaultValue={experience || ''}
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
      />
    </>
  );
}
