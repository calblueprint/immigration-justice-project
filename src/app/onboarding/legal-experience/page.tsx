'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import { BigButton, BigLinkButton } from '@/components/Button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import RadioGroup from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import { states } from '@/data/citiesAndStates';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { formatTruthy } from '@/utils/helpers';
import { useGuardedOnboarding } from '@/utils/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormDiv } from '../styles';

// zod schema to automate form validation
const legalExperienceSchema = z.object({
  stateBarred: z.string({ required_error: 'Required' }),
  barNumber: z.string({ required_error: 'Must include attorney bar number' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const { push } = useRouter();

  // initialize form with data from onboarding context
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

  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      !(formValues.stateBarred && formValues.barNumber) ||
      formValues.eoirRegistered === undefined,
    [formValues],
  );

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1Centered>Legal Experience</H1Centered>

        <FormField
          control={form.control}
          name="stateBarred"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Which state are you barred in?</FormLabel>
              <FormControl>
                <BigDataDropdown
                  options={states}
                  error={fieldState.error?.message}
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="barNumber"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>What is your attorney bar number?</FormLabel>
              <FormControl>
                <TextInput
                  errorText={fieldState.error?.message}
                  placeholder="123456"
                  type="text"
                  defaultValue={field.value}
                  onChange={newValue => {
                    onboarding.updateProfile({
                      bar_number: newValue,
                    });
                    field.onChange(newValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eoirRegistered"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                Are you registered by the Executive Office of Immigration
                Review?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  name="registered"
                  defaultValue={formatTruthy(
                    field.value,
                    'Yes',
                    'No',
                    undefined,
                  )}
                  options={['Yes', 'No']}
                  error={fieldState.error?.message}
                  onChange={newValue => {
                    const bool = newValue === 'Yes';
                    onboarding.updateProfile({ eoir_registered: bool });
                    field.onChange(bool);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Flex $gap="40px">
          {onboarding.flow.length > 0 && (
            <BigLinkButton href={`/onboarding/${onboarding.flow[2].url}`}>
              Back
            </BigLinkButton>
          )}
          <BigButton
            type="submit"
            disabled={isEmpty}
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
