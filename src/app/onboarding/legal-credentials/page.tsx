'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import { BigBlueButton, BigLinkButton } from '@/components/Buttons';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import Icon from '@/components/Icon';
import RadioGroup from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import { states } from '@/data/citiesAndStates';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { formatTruthy } from '@/utils/helpers';
import {
  useGuardedOnboarding,
  useOnboardingFormDirtyUpdate,
  useOnboardingFormSubmitterUpdate,
  useOnboardingNavigation,
} from '@/utils/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import * as Styles from '../styles';

// zod schema to automate form validation
const legalExperienceSchema = z.object({
  stateBarred: z.string({ required_error: 'Required' }),
  barNumber: z.string({ required_error: 'Must include attorney bar number' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const { backlinkHref } = useOnboardingNavigation();
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

  // update form submitter and dirty state
  const { handleSubmit, formState } = form;
  useOnboardingFormSubmitterUpdate(handleSubmit);
  useOnboardingFormDirtyUpdate(formState.isDirty);

  const onSubmit = () => {
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
      <CardForm onSubmit={form.handleSubmit(onSubmit)}>
        <Styles.BackLink href={backlinkHref}>
          <Icon type="leftArrow" />
        </Styles.BackLink>

        <H1Centered>Legal Credentials</H1Centered>

        <Styles.FormFieldsContainer>
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
            <BigLinkButton href={backlinkHref}>Back</BigLinkButton>
            <BigBlueButton type="submit" disabled={isEmpty}>
              Continue
            </BigBlueButton>
          </Flex>
        </Styles.FormFieldsContainer>
      </CardForm>
    </FormProvider>
  );
}
