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
import TextInput from '@/components/TextInput';
import { cities } from '@/data/citiesAndStates';
import { languages } from '@/data/languages';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormDiv } from '../styles';

const basicInformationSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Must include a first name' }),
    lastName: z.string().min(1, { message: 'Must include a last name' }),
    city: z.string().min(1, { message: 'Must include your city' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Must include your phone number' })
      .regex(
        /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/,
        { message: 'Invalid phone number' },
      ),
    canSpeaks: z.array(z.string()),
    canReads: z.array(z.string()),
  })
  .superRefine((inputs, ctx) => {
    if (inputs.canSpeaks.length + inputs.canReads.length === 0)
      return ctx.addIssue({
        code: 'custom',
        message: 'Please include at least one language',
      });
    return ctx;
  });

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  if (!onboarding)
    throw new Error(
      'Fatal: basic information onboarding should be wrapped in the onboarding context',
    );

  const [firstName, setFirstName] = useState(onboarding.profile.first_name);
  const [lastName, setLastName] = useState(onboarding.profile.last_name);
  const [phoneNumber, setPhoneNumber] = useState(
    onboarding.profile.phone_number,
  );

  const { push } = useRouter();

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

  const onSubmit = () => {
    onboarding.setProgress(2);
    push(`/onboarding/${onboarding.flow[2].url}`);
  };

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1>Basic Information</H1>

        <Flex $gap="20px" $w="100%">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Jane"
                    value={firstName ?? ''}
                    onChange={v => {
                      onboarding.updateProfile({
                        first_name: v,
                      });
                      field.onChange(v);
                      setFirstName(v);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Doe"
                    value={lastName ?? ''}
                    onChange={v => {
                      onboarding.updateProfile({
                        last_name: v,
                      });
                      field.onChange(v);
                      setLastName(v);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Flex>

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <BigDataDropdown
                  options={cities}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <TextInput
                  value={phoneNumber ?? ''}
                  onChange={newValue => {
                    onboarding.updateProfile({
                      phone_number: newValue,
                    });
                    setPhoneNumber(newValue);
                    field.onChange(newValue);
                  }}
                  placeholder="(123) 456-7890"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="canSpeaks"
          render={({ field }) => (
            <FormItem>
              <FormLabel $required={form.getValues().canReads.length === 0}>
                What languages can you speak and understand?
              </FormLabel>
              <FormControl>
                <BigDataDropdown
                  options={languages}
                  onChange={v => {
                    onboarding.setCanSpeaks(v);
                    field.onChange(v);
                  }}
                  multi
                  defaultValue={onboarding?.canSpeaks}
                  placeholder="Start typing to filter languages..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="canReads"
          render={({ field }) => (
            <FormItem>
              <FormLabel $required={form.getValues().canSpeaks.length === 0}>
                What languages can you read and write?
              </FormLabel>
              <FormControl>
                <BigDataDropdown
                  options={languages}
                  onChange={v => {
                    onboarding.setCanReads(v || new Set<string>());
                    field.onChange(v);
                  }}
                  defaultValue={onboarding?.canReads}
                  placeholder="Start typing to filter languages..."
                  multi
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Flex $gap="40px">
          <BigLinkButton href={`/onboarding/${onboarding.flow[0].url}`}>
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
