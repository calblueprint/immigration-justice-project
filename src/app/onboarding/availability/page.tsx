'use client';

import { BigBlueButton, BigLinkButton } from '@/components/Buttons';
import DateInput from '@/components/DateInput';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import Icon from '@/components/Icon';
import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { getCurrentDate, parseDateAlt } from '@/utils/helpers';
import { useGuardedOnboarding, useOnboardingNavigation } from '@/utils/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import * as Styles from '../styles';

// define form schema to automate form validation
const availabilitySchema = z.object({
  hoursPerMonth: z
    .number({
      required_error:
        'Please include your estimated availability in hours per month',
    })
    .nonnegative({ message: 'This value must be nonnegative' }),
  startDate: z
    .date({
      required_error:
        'Please include your estimated starting date of availability',
    })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  availability: z.string().optional(),
});

export default function Page() {
  const onboarding = useGuardedOnboarding();
  const { backlinkHref } = useOnboardingNavigation();
  const { push } = useRouter();

  const [startDate, setStartDate] = useState<string>(
    onboarding.profile.start_date ?? '',
  );

  // initialize react-hook-form with default values from onboarding context
  const form = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      hoursPerMonth: onboarding.profile.hours_per_month,
      startDate: onboarding.profile.start_date
        ? new Date(`${onboarding.profile.start_date}T00:00`)
        : undefined,
      availability: onboarding.profile.availability_description,
    },
  });

  // handle valid form submission
  // validity should have already been handled by Zod
  const onValidSubmit = () => {
    push(`/onboarding/${onboarding.flow[3].url}`);
  };

  // used to determine whether to disable the continue button
  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      formValues.hoursPerMonth === undefined ||
      formValues.startDate === undefined,
    [formValues],
  );

  return (
    <FormProvider {...form}>
      {/* noValidate to prevent default HTML invalid input pop-up */}
      <CardForm onSubmit={form.handleSubmit(onValidSubmit)} noValidate>
        <Styles.BackLink href={backlinkHref}>
          <Icon type="leftArrow" />
        </Styles.BackLink>

        <H1Centered>Availability</H1Centered>

        <Styles.FormFieldsContainer>
          <FormField
            control={form.control}
            name="hoursPerMonth"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  How much time do you have to commit per month?
                </FormLabel>
                <FormControl>
                  <TextInput
                    errorText={fieldState.error?.message}
                    placeholder="hours/month"
                    type="number"
                    min="0"
                    defaultValue={
                      field.value !== undefined ? field.value.toString() : ''
                    }
                    onChange={newValue => {
                      if (!newValue) {
                        field.onChange(undefined);
                        onboarding.updateProfile({
                          hours_per_month: undefined,
                        });
                        return;
                      }

                      const toNum = z.coerce.number().safeParse(newValue);
                      const num = toNum.success ? toNum.data : undefined;

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
                      field.onChange(new Date(`${newValue}T00:00`));
                      onboarding.updateProfile({
                        start_date: newValue,
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
                    defaultValue={field.value}
                    error={fieldState.error?.message}
                    onChange={newValue => {
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
