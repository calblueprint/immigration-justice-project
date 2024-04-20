'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import TextInput from '@/components/TextInput';
import { cities, languages } from '@/lib/bigData';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useContext, useEffect, useState } from 'react';
import { LineDiv } from '../styles';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    setFirstName(onboarding?.userProfile.first_name || '');
    setLastName(onboarding?.userProfile.last_name || '');
    if (
      onboarding?.userProfile.first_name !== '' &&
      onboarding?.userProfile.last_name !== '' &&
      onboarding?.userProfile.location !== '' &&
      onboarding?.canReads.size !== 0 &&
      onboarding?.canSpeaks.size !== 0
    ) {
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setProgress(1);
      onboarding?.setCanContinue(false);
    }
  }, [onboarding]);

  return (
    <>
      <H1>Basic Information</H1>
      <LineDiv>
        <TextInput
          label="First Name"
          placeholder="Jane"
          type="firstName"
          setValue={setFirstName}
          value={firstName}
          onChange={v => {
            onboarding?.updateProfile({
              first_name: v,
            });
          }}
        />
        <TextInput
          label="Last Name"
          placeholder="Doe"
          type="lastName"
          setValue={setLastName}
          value={lastName}
          onChange={v => {
            onboarding?.updateProfile({
              last_name: v,
            });
          }}
        />
      </LineDiv>
      <BigDataDropdown
        label="City"
        options={cities}
        onChange={v => {
          onboarding?.updateProfile({
            location: v || '',
          });
        }}
        defaultValue={onboarding?.userProfile.location}
        placeholder="Select a city"
      />
      <BigDataDropdown
        label="What languages can you speak and understand?"
        options={languages}
        onChange={v => {
          onboarding?.setCanSpeaks(v || new Set<string>());
        }}
        defaultValue={onboarding?.canSpeaks}
        placeholder="Select a language"
        multi
      />
      <BigDataDropdown
        label="What languages can you read and write?"
        options={languages}
        onChange={v => {
          onboarding?.setCanReads(v || new Set<string>());
        }}
        defaultValue={onboarding?.canReads}
        placeholder="Select a language"
        multi
      />
    </>
  );
}
