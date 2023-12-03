'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { cities, languages } from '@/lib/bigData';
import BigDataDropdown from '@/components/BigDataDropdown';
import COLORS from '@/styles/colors';
import { H1, P, LinkColored } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { H4Centered, QuestionsDiv, SpacerDiv } from '@/app/(auth)/styles';
import TextInput from '@/components/TextInput';
import { LineDiv } from './styles';

/*
export const cities = new Set(
  City.getAllCities()
    .sort((c1, c2) => c1.countryCode.localeCompare(c2.countryCode))
    .map(
      c =>
        `${c.name}, ${
          State.getStateByCodeAndCountry(c.stateCode, c.countryCode)?.name
        }, ${Country.getCountryByCode(c.countryCode)?.name}`,
    ),
);
*/

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();

  const handleInsert = async () => {
    if (!firstName || !lastName) return;

    setFirstName('');
    setLastName('');
    setCity('');
    setLanguage('');
  };

  // <div style={{ display: 'flex', gap: '4.5rem' }}>

  return (
    <>
      <H1>Basic Information</H1>
      <SpacerDiv>
        <QuestionsDiv>
          <LineDiv>
            <TextInput
              label="First Name"
              placeholder="Rahi"
              type="firstName"
              setValue={setFirstName}
              value={firstName}
            />
            <TextInput
              label="Last Name"
              placeholder="Hazra"
              type="lastName"
              setValue={setLastName}
              value={lastName}
            />
          </LineDiv>
          <BigDataDropdown
            label="City"
            options={cities}
            onChange={selectedCity => setCity(selectedCity || '')}
            // value={city || ''}
            // setValue={setCity}
            placeholder="Select a city"
          />
          <BigDataDropdown
            label="What languages can you speak and understand?"
            options={languages}
            onChange={selectedLanguage => setLanguage(selectedLanguage || '')}
            // value={language || ''}
            // setValue={setLanguage}
            placeholder="Select a language"
            multi
          />
          <BigDataDropdown
            label="What languages can you read and write?"
            options={languages}
            onChange={selectedLanguage => setLanguage(selectedLanguage || '')}
            // value={language || ''}
            // setValue={setLanguage}
            placeholder="Select a language"
            multi
          />
        </QuestionsDiv>
      </SpacerDiv>
      <SpacerDiv>
        <Button
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          onClick={() => onboarding && onboarding.setCanContinue(true)}
        >
          Enable continue
        </Button>
      </SpacerDiv>
    </>
  );
}

/* return (
    <>
      <H1>Basic Information</H1>
      <Button
        $primaryColor={COLORS.blueMid}
        $secondaryColor={COLORS.blueDark}
        onClick={() => onboarding && onboarding.setCanContinue(true)}
      >
        Enable continue
      </Button>
    </>
  );
  */
