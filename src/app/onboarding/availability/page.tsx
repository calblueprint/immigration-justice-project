'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BigBlueButton, BigButton } from '@/components/Buttons';
import DateInput from '@/components/DateInput';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import Icon from '@/components/Icon';
import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';
import { availabilitySchema, CHAR_LIMIT_MSG } from '@/data/formSchemas';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import {
  getCurrentDate,
  identity,
  parseDateAlt,
  parseDateString,
} from '@/utils/helpers';
import {
  useGuardedOnboarding,
  useOnboardingNavigation,
  useScrollToTop,
} from '@/utils/hooks';
import * as Styles from '../styles';

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const { backlinkHref, ebbTo, pageProgress } = useOnboardingNavigation();
  const { push } = useRouter();
  const [availabilityError, setAvailabilityError] = useState('');
  const [hoursError, setHoursError] = useState('');

  // scroll to top
  useScrollToTop();

  const [startDate, setStartDate] = useState<string>(
    onboarding.profile.start_date
      ? parseDateAlt(onboarding.profile.start_date)
      : '',
  );

  // initialize react-hook-form with default values from onboarding context
  const form = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      hoursPerMonth: onboarding.profile.hours_per_month,
      startDate: onboarding.profile.start_date
        ? onboarding.profile.start_date
        : undefined,
      availability: onboarding.profile.availability_description,
    },
  });

  // used to determine whether to disable the continue button
  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      formValues.hoursPerMonth === undefined ||
      formValues.startDate === undefined,
    [formValues],
  );

  // update form submitter and dirty state
  const { setForm: setOnboardingForm } = onboarding;
  const { isDirty, isValid } = form.formState;
  useEffect(() => {
    setOnboardingForm({
      trigger: form.handleSubmit(identity),
      isDirty,
      isValid,
    });
  }, [setOnboardingForm, form, isDirty, isValid]);

  // handle valid form submission
  // validity should have already been handled by Zod
  const onValidSubmit = () => {
    push(`/onboarding/${onboarding.flow[pageProgress + 1].url}`);
    onboarding.setForm(undefined);
  };

  return (
    <FormProvider {...form}>
      {/* noValidate to prevent default HTML invalid input pop-up */}
      <CardForm onSubmit={form.handleSubmit(onValidSubmit)} noValidate>
        <Styles.BackLinkButton
          type="button"
          onClick={() => ebbTo(backlinkHref)}
        >
          <Icon type="leftArrow" />
        </Styles.BackLinkButton>

        <Styles.RequiredText>Required Fields</Styles.RequiredText>

        <H1Centered>Availability</H1Centered>

        <Styles.FormFieldsContainer>
          <FormField
            control={form.control}
            name="hoursPerMonth"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  How many hours are you able to volunteer per month?
                </FormLabel>
                <FormControl>
                  <TextInput
                    errorText={fieldState.error?.message ?? hoursError}
                    placeholder="x hours per month"
                    inputMode="numeric"
                    defaultValue={
                      field.value !== undefined ? field.value.toString() : ''
                    }
                    onChange={newValue => {
                      if (!newValue) {
                        field.onChange(undefined);
                        onboarding.updateProfile({
                          hours_per_month: undefined,
                        });
                        setHoursError('');
                        return;
                      }

                      const toNum = z.coerce.number().safeParse(newValue);
                      const num = toNum.success ? toNum.data : undefined;

                      if (num === undefined) {
                        setHoursError('Hours per month must be a number.');
                      } else if (num < 0) {
                        setHoursError('Hours per month cannot be negative.');
                      } else {
                        setHoursError('');
                      }

                      field.onChange(num);
                      onboarding.updateProfile({
                        hours_per_month: num,
                      });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  What is the earliest you are available to volunteer?
                </FormLabel>
                <FormControl>
                  <DateInput
                    error={fieldState.error?.message}
                    min={parseDateAlt(getCurrentDate())}
                    value={startDate}
                    setValue={setStartDate}
                    onChange={newValue => {
                      // turn "" into undefined (cannot be parsed to date)
                      if (!newValue) {
                        field.onChange(undefined);
                        onboarding.updateProfile({
                          start_date: undefined,
                        });
                        return;
                      }

                      const newDate = parseDateString(newValue);
                      field.onChange(newDate);
                      onboarding.updateProfile({
                        start_date: newDate,
                      });
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel $required={false}>
                  Are there specific time periods you will not be available?
                  (optional)
                </FormLabel>
                <FormControl>
                  <TextAreaInput
                    placeholder="I won't be available from..."
                    defaultValue={field.value ?? ''}
                    error={fieldState.error?.message ?? availabilityError}
                    onChange={newValue => {
                      setAvailabilityError(
                        newValue.length > 400 ? CHAR_LIMIT_MSG : '',
                      );
                      onboarding.updateProfile({
                        availability_description: newValue,
                      });
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Flex $gap="40px">
            <BigButton type="button" onClick={() => ebbTo(backlinkHref)}>
              Back
            </BigButton>
            <BigBlueButton type="submit" disabled={isEmpty}>
              Continue
            </BigBlueButton>
          </Flex>
        </Styles.FormFieldsContainer>
      </CardForm>
    </FormProvider>
  );
}
