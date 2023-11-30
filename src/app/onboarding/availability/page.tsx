'use client';

import { useContext, useState } from 'react';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { H1, H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { FormTextArea } from '@/components/InterestForm/styles';
import TextInput from '@/components/TextInput';
import { SpacerDiv } from '@/app/(auth)/styles';
import { isValidDate } from '@/utils/helpers';
import DateInput from '@/components/DateInput';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [periods, setPeriods] = useState('');

  const getErrorText = () => {
    if (startDate !== '' && !isValidDate(startDate)) {
      return 'Must select a current or future date';
    }
    return '';
  };

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

      <DateInput
        label="What is the earliest you are available to volunteer?"
        // id="startDate"
        error={getErrorText()}
        value={startDate}
        setValue={setStartDate}
      />
      <SpacerDiv gap={0.625}>
        <H4 $color={COLORS.greyDark}>
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
