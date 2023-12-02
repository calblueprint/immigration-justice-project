'use client';

import { useContext, useState, useEffect } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import TextInput from '@/components/TextInput';
import { isValidDate } from '@/utils/helpers';
import DateInput from '@/components/DateInput';
import { Profile } from '@/types/schema';
import TextAreaInput from '@/components/TextAreaInput';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [periods, setPeriods] = useState('');

  const getHoursErrorText = () => {
    if (hours !== '' && Number.isNaN(parseInt(hours, 10))) {
      return 'Must be a number';
    }
    return '';
  };

  const getErrorText = () => {
    if (startDate !== '' && !isValidDate(startDate)) {
      return 'Must select a current or future date';
    }
    return '';
  };

  useEffect(() => {
    if (
      hours !== '' &&
      !Number.isNaN(parseInt(hours, 10)) &&
      startDate !== '' &&
      isValidDate(startDate)
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
        error={getErrorText()}
        value={startDate}
        setValue={setStartDate}
      />
      <TextAreaInput
        label="Are there specific time periods you will not be available? (Optional)"
        placeholder="I won’t be available from..."
        id="periods"
        height={5.3125}
        value={periods}
        setValue={setPeriods}
      />
    </>
  );
}
