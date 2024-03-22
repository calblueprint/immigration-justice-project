'use client';

import { useContext, useState } from 'react';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import RadioGroup from '@/components/RadioGroup';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import { Flex } from '@/styles/containers';
import { BigButton, BigLinkButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import { useRouter } from 'next/navigation';
import { boolToString, getCurrentDate, parseDateAlt } from '@/utils/helpers';
import DateInput from '@/components/DateInput';
import { FormDiv } from '../styles';

const legalExperienceSchema = z.object({
  expectedBarDate: z
    .date({ required_error: 'Must include expected barred date' })
    .min(getCurrentDate(), { message: 'Must select a current or future date' }),
  eoirRegistered: z.boolean({ required_error: 'Must select one option' }),
});

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: legal experience onboarding should be wrapped in the onboarding context',
    );

  const [expectedBarDate, setExpectedBarDate] = useState<string>(
    onboarding.profile.expected_bar_date ?? '',
  );
  const [registered, setRegistered] = useState<string>(
    boolToString(onboarding.profile.eoir_registered, 'Yes', 'No'),
  );
  const { push } = useRouter();

  const form = useForm<z.infer<typeof legalExperienceSchema>>({
    resolver: zodResolver(legalExperienceSchema),
    defaultValues: {
      expectedBarDate: onboarding.profile.expected_bar_date
        ? new Date(`${onboarding.profile.expected_bar_date}T00:00`)
        : undefined,
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
        <H1>Legal Experience</H1>

        <FormField
          control={form.control}
          name="expectedBarDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When are you expected to be barred?</FormLabel>
              <FormControl>
                <DateInput
                  value={expectedBarDate}
                  min={parseDateAlt(new Date())}
                  setValue={setExpectedBarDate}
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
