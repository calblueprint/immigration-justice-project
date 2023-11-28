'use client';

import { useContext, useState } from 'react';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { H1, H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { FormTextArea } from '@/components/InterestForm/styles';
import TextInput from '@/components/TextInput';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
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
      <TextInput
        label="What is the earliest you are available to volunteer?"
        placeholder=""
        errorText=""
        type="date"
        id="date"
        value={date}
        setValue={setDate}
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
      />
      {/*
      <H4>Why are you interested in this case?</H4>
      <FormTextArea
        id="reason"
        required
        value={periods}
        //  onChange={event => setPeriods(event.target.value)}
      /> 
      */}
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
