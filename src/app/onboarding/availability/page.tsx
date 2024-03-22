'use client';

import { BigButton, BigLinkButton } from '@/components/Button';
import DateInput from '@/components/DateInput';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { getCurrentDate, parseDateAlt } from '@/utils/helpers';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormDiv } from '../styles';

const availabilitySchema = z.object({
  hoursPerMonth: z
    .number()
    .nonnegative({ message: 'This value must be nonnegative' }),
  startDate: z
    .date()
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  availability: z.string().optional(),
});

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: availability onboarding should be wrapped in the onboarding context',
    );

  const [hours, setHours] = useState<string>(
    onboarding.profile.hours_per_month?.toString() ?? '',
  );
  const [startDate, setStartDate] = useState<string>(
    onboarding.profile.start_date ?? '',
  );
  const [periods, setPeriods] = useState<string>(
    onboarding.profile.availability_description ?? '',
  );
  const { push } = useRouter();

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

  const onSubmit = () => {
    onboarding.setProgress(3);
    push(`/onboarding/${onboarding.flow[3].url}`);
  };

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1>Availability</H1>

        <FormField
          control={form.control}
          name="hoursPerMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How much time do you have to commit per month?
              </FormLabel>
              <FormControl>
                <TextInput
                  placeholder="hours/month"
                  value={hours}
                  setValue={setHours}
                  inputMode="numeric"
                  onChange={newValue => {
                    const toNum = z.coerce.number().safeParse(newValue);
                    const num = toNum.success ? toNum.data : undefined;

                    field.onChange(num);
                    onboarding.updateProfile({
                      hours_per_month: num,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is the earliest you are available to volunteer?
              </FormLabel>
              <FormControl>
                <DateInput
                  value={startDate}
                  min={parseDateAlt(new Date())}
                  setValue={setStartDate}
                  onChange={newValue => {
                    field.onChange(new Date(`${newValue}T00:00`));
                    onboarding.updateProfile({
                      start_date: newValue,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel $required={false}>
                Are there specific time periods you will not be available?
                (optional)
              </FormLabel>
              <FormControl>
                <TextAreaInput
                  placeholder="I won't be available from..."
                  value={periods}
                  setValue={setPeriods}
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
          <BigLinkButton href={`/onboarding/${onboarding.flow[1].url}`}>
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
