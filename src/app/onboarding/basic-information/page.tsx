'use client';

import { useState, useContext, useEffect } from 'react';
import { cities, languages } from '@/lib/bigData';
import BigDataDropdown from '@/components/BigDataDropdown';
import { H1, P } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { QuestionsDiv, SpacerDiv } from '@/app/(auth)/styles';
import TextInput from '@/components/TextInput';
import { LineDiv } from './styles';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    setFirstName(onboarding?.profile.first_name || '');
    setLastName(onboarding?.profile.last_name || '');
  }, []);

  useEffect(() => {
    console.log(firstName);
    console.log(lastName);
    console.log(onboarding?.profile.location);
    console.log('crying');
    if (
      firstName !== '' &&
      lastName !== '' &&
      onboarding?.profile.location !== ''
    ) {
      onboarding?.setCanContinue(true);
      console.log('sobbing');
    } else {
      onboarding?.setProgress(1);
      onboarding?.setCanContinue(false);
      console.log('screaming');
    }
  }, [onboarding, firstName, lastName]);

  useEffect(() => {
    onboarding?.updateProfile({
      first_name: firstName,
      last_name: lastName,
    });
  }, [firstName, lastName]);

  return (
    <>
      <H1>Basic Information</H1>
      <SpacerDiv>
        <QuestionsDiv>
          <LineDiv>
            <TextInput
              label="First Name"
              placeholder="Jane"
              type="firstName"
              setValue={setFirstName}
              value={firstName}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              type="lastName"
              setValue={setLastName}
              value={lastName}
            />
          </LineDiv>
          <BigDataDropdown
            label="City"
            options={cities}
            onChange={v => {
              onboarding?.updateProfile({
                location: v || undefined,
              });
            }}
            defaultValue={onboarding?.profile.location}
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
        </QuestionsDiv>
      </SpacerDiv>
    </>
  );
}
