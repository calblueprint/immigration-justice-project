'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import { BigBlueButton, BigLinkButton } from '@/components/Buttons';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import Icon from '@/components/Icon';
import TextInput from '@/components/TextInput';
import { cities } from '@/data/citiesAndStates';
import { optionalLanguages } from '@/data/languages';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
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

// define form schema using Zod to automate form validation
const basicInformationSchema = z.object({
  firstName: z.string({ required_error: 'Please include your first name' }),
  lastName: z.string({ required_error: 'Please include your last name' }),
  city: z.string({
    required_error: 'Please include the city of your primary residence',
  }),
  phoneNumber: z
    .string({ required_error: 'Please include a phone number' })
    .regex(
      /(^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$)|(^$)/,
      { message: 'Invalid phone number' },
    ),
  canSpeaks: z
    .array(z.string())
    .min(1, 'Please select a value for languages you can speak or understand'),
  canReads: z
    .array(z.string())
    .min(1, 'Please select a value for languages you can speak or understand'),
});

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const { backlinkHref } = useOnboardingNavigation();
  const { push } = useRouter();

  // initialize react hook form with current data from onboarding context
  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      firstName: onboarding.profile.first_name,
      lastName: onboarding.profile.last_name,
      canSpeaks: onboarding.canSpeaks,
      canReads: onboarding.canReads,
      city: onboarding.profile.location,
      phoneNumber: onboarding.profile.phone_number,
    },
  });

  // update form submitter and dirty state
  useOnboardingFormSubmitterUpdate(form.handleSubmit);
  useOnboardingFormDirtyUpdate(form.formState.isDirty);

  // used to determine whether to disable the continue button
  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      !(
        formValues.firstName &&
        formValues.lastName &&
        formValues.city &&
        formValues.phoneNumber &&
        formValues.canReads.length > 0 &&
        formValues.canSpeaks.length > 0
      ),
    [formValues],
  );

  // handle valid form submission
  // - validity should be handled by Zod
  const onSubmit = () => {
    push(`/onboarding/${onboarding.flow[2].url}`);
    onboarding.setFormIsDirty(false);
  };

  return (
    <FormProvider {...form}>
      <CardForm onSubmit={form.handleSubmit(onSubmit)}>
        <Styles.BackLink href={backlinkHref}>
          <Icon type="leftArrow" />
        </Styles.BackLink>

        <H1Centered>Basic Information</H1Centered>

        <Styles.FormFieldsContainer>
          <Flex $gap="20px" $w="100%">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <TextInput
                      placeholder="Jane"
                      errorText={fieldState.error?.message}
                      defaultValue={field.value}
                      onChange={v => {
                        onboarding.updateProfile({
                          first_name: v,
                        });
                        field.onChange(v);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <TextInput
                      placeholder="Doe"
                      errorText={fieldState.error?.message}
                      defaultValue={field.value}
                      onChange={v => {
                        onboarding.updateProfile({
                          last_name: v,
                        });
                        field.onChange(v);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Flex>

          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <BigDataDropdown
                    options={cities}
                    error={fieldState.error?.message}
                    onChange={v => {
                      onboarding.updateProfile({
                        location: v ?? '',
                      });
                      field.onChange(v ?? '');
                    }}
                    defaultValue={onboarding?.profile.location}
                    placeholder="Start typing to filter cities..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <TextInput
                    errorText={fieldState.error?.message}
                    defaultValue={field.value}
                    onChange={newValue => {
                      onboarding.updateProfile({
                        phone_number: newValue,
                      });
                      field.onChange(newValue);
                    }}
                    placeholder="(123) 456-7890"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="canSpeaks"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  What languages can you speak and understand?
                </FormLabel>
                <FormControl>
                  <BigDataDropdown
                    error={fieldState.error?.message}
                    options={optionalLanguages}
                    onChange={v => {
                      onboarding.setCanSpeaks(v);
                      field.onChange(v);
                    }}
                    multi
                    defaultValue={onboarding?.canSpeaks}
                    placeholder="Start typing to filter languages..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="canReads"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>What languages can you read and write?</FormLabel>
                <FormControl>
                  <BigDataDropdown
                    error={fieldState.error?.message}
                    options={optionalLanguages}
                    onChange={v => {
                      onboarding.setCanReads(v);
                      field.onChange(v);
                    }}
                    defaultValue={onboarding?.canReads}
                    placeholder="Start typing to filter languages..."
                    multi
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
