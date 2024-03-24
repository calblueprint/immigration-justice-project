'use client';

import BigDataDropdown from '@/components/BigDataDropdown';
import { BigButton, BigLinkButton } from '@/components/Button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import TextInput from '@/components/TextInput';
import { cities } from '@/data/citiesAndStates';
import { languages } from '@/data/languages';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { useGuardedOnboarding } from '@/utils/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormDiv } from '../styles';

// TODO: update big data dropdown to use async loadOptions
// to run more resource-intensive search/filter computations on the sever side

// define form schema using Zod to automate form validation
const basicInformationSchema = z
  .object({
    firstName: z.string({ required_error: 'Please include your first name' }),
    lastName: z.string({ required_error: 'Please include your last name' }),
    city: z.string({
      required_error: 'Please include the city of your primary residence',
    }),
    phoneNumber: z
      .string()
      // uncomment to enable regex checking for phone numbers
      // currently disabled since it's optional anyways, and complicated regex is bad for performance
      // .regex(
      //   /(^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$)|(^$)/,
      //   { message: 'Invalid phone number' },
      // )
      .optional(),
    canSpeaks: z.array(z.string()),
    canReads: z.array(z.string()),
  })
  .superRefine((inputs, ctx) => {
    // ensures either canSpeak or canRead has at least one language
    if (inputs.canSpeaks.length + inputs.canReads.length === 0)
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['canReads', 'canSpeaks'],
        message:
          'Please include at least one language that you can speak and understand or read and write in.',
      });
    return ctx;
  });

export default function Page() {
  const onboarding = useGuardedOnboarding();
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

  // used to determine whether to disable the continue button
  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      !(
        formValues.firstName &&
        formValues.lastName &&
        formValues.city &&
        (formValues.canReads.length > 0 || formValues.canSpeaks.length > 0)
      ),
    [formValues],
  );

  // handle valid form submission
  // - validity should be handled by Zod
  const onSubmit = () => {
    onboarding.setProgress(2);
    push(`/onboarding/${onboarding.flow[2].url}`);
  };

  return (
    <FormProvider {...form}>
      <FormDiv onSubmit={form.handleSubmit(onSubmit)}>
        <H1Centered>Basic Information</H1Centered>

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
              <FormLabel $required={false}>Phone Number</FormLabel>
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
              <FormLabel
                $required={
                  form.getValues().canReads.length === 0 ||
                  field.value.length > 0
                }
              >
                What languages can you speak and understand?
              </FormLabel>
              <FormControl>
                <BigDataDropdown
                  error={fieldState.error?.message}
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="canReads"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                $required={
                  form.getValues().canSpeaks.length === 0 ||
                  field.value.length > 0
                }
              >
                What languages can you read and write?
              </FormLabel>
              <FormControl>
                <BigDataDropdown
                  error={fieldState.error?.message}
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
            </FormItem>
          )}
        />

        <Flex $gap="40px">
          {onboarding.flow.length > 0 && (
            <BigLinkButton
              // technically redundant - can fix to '/onboarding/roles'
              // will leave here for consistency with other pages
              // in case the flow order ever changes
              href={`/onboarding/${onboarding.flow[0].url}`}
            >
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
