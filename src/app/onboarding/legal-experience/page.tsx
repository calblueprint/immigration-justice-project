'use client';

import RadioGroup from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import { H1 } from '@/styles/text';
import { isValidBarNumber } from '@/utils/helpers';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [barNum, setBarNum] = useState('');
  const [registered, setRegistered] = useState('');
  const [barNumError, setBarNumError] = useState('');

  useEffect(() => {
    if (!onboarding) return;

    const barNumber = onboarding.userProfile.bar_number || '';
    const isRegistered = onboarding.userProfile.eoir_registered;

    setBarNum(barNumber);
    if (isRegistered !== undefined)
      setRegistered(onboarding.userProfile.eoir_registered ? 'Yes' : 'No');

    if (isValidBarNumber(barNumber) && isRegistered !== undefined) {
      onboarding.setCanContinue(true);
    } else {
      onboarding.setProgress(3);
      onboarding.setCanContinue(false);
    }
  }, [onboarding]);

  const handleBarNumChange = useCallback(
    (v: string) => {
      setBarNumError(isValidBarNumber(v) ? '' : 'Invalid bar number');
      onboarding?.updateProfile({ bar_number: v });
    },
    [onboarding],
  );

  return (
    <>
      <H1>Legal Experience</H1>
      <TextInput
        label="What is your attorney bar number?"
        placeholder="123456"
        errorText={barNumError}
        type="text"
        id="barNum"
        value={barNum}
        setValue={setBarNum}
        onChange={v => handleBarNumChange(v)}
      />
      <RadioGroup
        name="registered"
        value={registered}
        setValue={setRegistered}
        options={['Yes', 'No']}
        label="Are you registered by the Executive Office of Immigration Review?"
        error=""
        onChange={v =>
          onboarding?.updateProfile({ eoir_registered: v === 'Yes' })
        }
      />
    </>
  );
}
