'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { H1, P, LinkColored } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { H4Centered, QuestionsDiv, SpacerDiv } from '@/app/(auth)/styles';
import TextInput from '@/components/TextInput';
import { LineDiv } from './styles';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();

  const handleInsert = async () => {
    if (!firstName || !lastName) return;

    setFirstName('');
    setLastName('');
    setCity('');
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
              errorText="first name error"
            />
            <TextInput
              label="Last Name"
              placeholder="Hazra"
              type="lastName"
              setValue={setLastName}
              value={lastName}
              errorText="last name error"
            />
          </LineDiv>
          <TextInput
            label="City"
            placeholder="ur mom's house"
            errorText="city error"
            value={city}
            setValue={setCity}
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
