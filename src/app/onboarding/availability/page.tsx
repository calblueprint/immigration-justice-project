'use client';

import { useContext, useMemo, useState, useEffect } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import TextInput from '@/components/TextInput';
import { isValidDate, parseDateAlt } from '@/utils/helpers';
import DateInput from '@/components/DateInput';
import TextAreaInput from '@/components/TextAreaInput';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [hours, setHours] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [periods, setPeriods] = useState<string>('');

  const getHoursErrorText = useMemo(
    () =>
      hours && Number.isNaN(parseInt(hours, 10)) ? 'Must be a number' : '',
    [hours],
  );

  const getStartDateErrorText = useMemo(
    () =>
      startDate && !isValidDate(startDate)
        ? 'Must select a current or future date'
        : '',
    [startDate],
  );

  useEffect(() => {
    const hpm = onboarding?.profile.hours_per_month;
    setHours(hpm !== undefined && hpm >= 0 ? hpm.toString() : '');
    setStartDate(onboarding?.profile.start_date || '');
    setPeriods(onboarding?.profile.availability_description || '');

    if (
      hpm !== undefined &&
      hpm >= 0 &&
      onboarding?.profile.start_date &&
      isValidDate(onboarding?.profile.start_date)
    ) {
      onboarding?.setCanContinue(true);
    } else {
      onboarding?.setProgress(2);
      onboarding?.setCanContinue(false);
    }
  }, [onboarding]);

  const handleHours = (v: string) => {
    const n = parseInt(v, 10);
    if (Number.isNaN(n)) {
      onboarding?.updateProfile({
        hours_per_month: undefined,
      });
    } else {
      onboarding?.updateProfile({
        hours_per_month: n,
      });
    }
  };

  const handleStartDate = (v: string) => {
    if (v === '' || isValidDate(v)) {
      onboarding?.updateProfile({
        start_date: v,
      });
    }
  };

  const handleAvailability = (v: string) => {
    onboarding?.updateProfile({
      availability_description: v,
    });
  };

  return (
    <>
      <H1>Availability</H1>
      <TextInput
        label="How much time do you have to commit? (hrs/month)"
        placeholder="hours/month"
        errorText={getHoursErrorText}
        type="text"
        id="hours"
        value={hours}
        setValue={setHours}
        onChange={handleHours}
      />
      <DateInput
        label="What is the earliest you are available to volunteer?"
        id="start_date"
        error={getStartDateErrorText}
        value={startDate}
        min={parseDateAlt(new Date())}
        setValue={setStartDate}
        onChange={handleStartDate}
      />
      <TextAreaInput
        label="Are there specific time periods you will not be available? (Optional)"
        placeholder="I won't be available from..."
        id="periods"
        value={periods}
        setValue={setPeriods}
        onChange={handleAvailability}
      />
    </>
  );
}
