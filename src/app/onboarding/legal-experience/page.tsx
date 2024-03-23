'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import { BigButton, BigLinkButton } from '@/components/Button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import RadioGroup from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import { states } from '@/data/citiesAndStates';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { boolToString } from '@/utils/helpers';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormDiv } from '../styles';

const legalExperienceSchema = z.object({
  stateBarred: z.string({ required_error: 'Required' }),
  barNumber: z.string({ required_error: 'Must include attorney bar number' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: legal experience onboarding should be wrapped in the onboarding context',
    );

  const [barNum, setBarNum] = useState<string>(
    onboarding.profile.bar_number ?? '',
  );
  const [registered, setRegistered] = useState<string>(
    boolToString(onboarding.profile.eoir_registered, 'Yes', 'No'),
  );
  const { push } = useRouter();

  const form = useForm<z.infer<typeof legalExperienceSchema>>({
    resolver: zodResolver(legalExperienceSchema),
    defaultValues: {
      stateBarred: onboarding.profile.state_barred,
      barNumber: onboarding.profile.bar_number,
      eoirRegistered: onboarding.profile.eoir_registered,
    },
  });

  const onSubmit = () => {
    onboarding.setProgress(4);
    push(`/onboarding/${onboarding.flow[4].url}`);
  };

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1Centered>Legal Experience</H1Centered>

        <FormField
          control={form.control}
          name="stateBarred"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which state are you barred in?</FormLabel>
              <FormControl>
                <BigDataDropdown
                  options={states}
                  onChange={newValue => {
                    field.onChange(newValue);
                    onboarding.updateProfile({
                      state_barred: newValue ?? undefined,
                    });
                  }}
                  defaultValue={onboarding.profile.state_barred}
                  placeholder="Start typing to filter states..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="barNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your attorney bar number?</FormLabel>
              <FormControl>
                <TextInput
                  placeholder="123456"
                  type="text"
                  value={barNum}
                  setValue={setBarNum}
                  onChange={newValue => {
                    onboarding.updateProfile({
                      bar_number: newValue,
                    });
                    field.onChange(newValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eoirRegistered"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Are you registered by the Executive Office of Immigration
                Review?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  name="registered"
                  value={registered}
                  setValue={setRegistered}
                  options={['Yes', 'No']}
                  error=""
                  onChange={newValue => {
                    const bool = newValue === 'Yes';
                    onboarding.updateProfile({ eoir_registered: bool });
                    field.onChange(bool);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Flex $gap="40px">
          <BigLinkButton href={`/onboarding/${onboarding.flow[2].url}`}>
            Back
          </BigLinkButton>
          <BigButton
            type="submit"
            disabled={!form.formState.isValid}
            $primaryColor={COLORS.blueMid}
            $secondaryColor={COLORS.blueDark}
            $tertiaryColor={COLORS.blueDarker}
          >
            Continue
          </BigButton>
        </Flex>
      </FormDiv>
    </FormProvider>
  );
}
