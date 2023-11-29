'use client';

import { useContext, useState } from 'react';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { H1, H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { FormInput, FormTextArea } from '@/components/InterestForm/styles';
import TextInput from '@/components/TextInput';
import { SpacerDiv } from '@/app/(auth)/styles';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [periods, setPeriods] = useState('');

  return (
    <>
      <H1>Availability</H1>
      <TextInput
        label="How much time do you have to commit? (hrs/month)"
        placeholder="Hrs/month"
        errorText=""
        type="text"
        id="hours"
        value={hours}
        setValue={setHours}
      />
      {/*
      <TextInput
        label="What is the earliest you are available to volunteer?"
        placeholder=""
        errorText=""
        type="date"
        id="date"
        value={startDate}
        setValue={setStartDate}
      />
      <TextInput
        label="Are there specific time periods you will not be available? (Optional)"
        placeholder="I won’t be available from..."
        errorText=""
        type="text"
        id="periods"
        height={5.1875}
        value={periods}
        setValue={setPeriods}
      /> */}
      <SpacerDiv gap={0.625}>
        <H4>What is the earliest you are available to volunteer?</H4>
        <FormInput
          id="startDate"
          required
          placeholder="MM/DD/YYYY"
          value={startDate}
          onChange={event => setStartDate(event.target.value)}
        />
      </SpacerDiv>
      <SpacerDiv gap={0.625}>
        <H4>
          Are there specific time periods you will not be available? (Optional)
        </H4>
        <FormTextArea
          id="periods"
          placeholder="I won’t be available from..."
          value={periods}
          onChange={event => setPeriods(event.target.value)}
        />
      </SpacerDiv>
      <Button
        $primaryColor={COLORS.blueMid}
        $secondaryColor={COLORS.blueDark}
        onClick={() => onboarding && onboarding.setCanContinue(true)}
      >
        Enable continue
      </Button>
    </>
  );
}
