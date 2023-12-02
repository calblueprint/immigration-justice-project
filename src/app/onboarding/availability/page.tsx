'use client';

import { useContext, useState, useEffect } from 'react';
import COLORS from '@/styles/colors';
import { H1, H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { FormTextArea } from '@/components/InterestForm/styles';
import TextInput from '@/components/TextInput';
import { SpacerDiv } from '@/app/(auth)/styles';
import { isValidDate } from '@/utils/helpers';
import DateInput from '@/components/DateInput';
import { Profile } from '@/types/schema';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [periods, setPeriods] = useState('');

  const getHoursErrorText = () => {
    const numericRegex = /^\d+$/;
    if (hours !== '' && !numericRegex.test(hours)) {
      return 'Must be a number';
      // Number.isNaN(Number(hours))
    }
    return '';
  };

  const getErrorText = () => {
    if (startDate !== '' && !isValidDate(startDate)) {
      return 'Must select a current or future date';
    }
    return '';
  };
  // const updateProfile = (h: string, date: string, availability: string) => {
  //   const partialProfile: Partial<Profile> = {
  //     hours_per_month: +h,
  //     start_date: date,
  //     availability_description: availability,
  //   };
  //   onboarding?.updateProfile(partialProfile);
  // };

  useEffect(() => {
    if (
      hours !== '' &&
      startDate !== '' &&
      isValidDate(startDate) &&
      /^\d+$/.test(hours)
    ) {
      // update profile
      const partialProfile: Partial<Profile> = {
        hours_per_month: +hours,
        start_date: startDate,
        availability_description: periods,
      };
      onboarding?.updateProfile(partialProfile);
      // enable continue
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setCanContinue(false);
    }
  }, [hours, startDate, periods]);
  // onboarding is causing too many reloads...

  return (
    <>
      <H1>Availability</H1>
      <TextInput
        label="How much time do you have to commit? (hrs/month)"
        placeholder="Hrs/month"
        errorText={getHoursErrorText()}
        type="text"
        id="hours"
        value={hours}
        setValue={setHours}
      />
      <DateInput
        label="What is the earliest you are available to volunteer?"
        // id="startDate"
        error={getErrorText()}
        value={startDate}
        setValue={setStartDate}
      />
      <SpacerDiv $gap={0.625}>
        <H4 $color={COLORS.greyDark}>
          Are there specific time periods you will not be available? (Optional)
        </H4>
        <FormTextArea
          $height={5.3125}
          id="periods"
          placeholder="I won’t be available from..."
          value={periods}
          onChange={event => setPeriods(event.target.value)}
        />
      </SpacerDiv>
    </>
  );
}
