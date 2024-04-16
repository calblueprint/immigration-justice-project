'use client';

import { useEffect, useMemo } from 'react';
import { City, State } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import type { DropdownOption } from '@/types/dropdown';
import type { GroupBase } from 'react-select';
import type { LoadOptions } from 'react-select-async-paginate';
import { BigBlueButton, BigLinkButton } from '@/components/Buttons';
import CreatableBigDataDropdown from '@/components/CreatableBigDataDropdown';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/Form';
import Icon from '@/components/Icon';
import TextInput from '@/components/TextInput';
import { countries } from '@/data/citiesAndStates';
import { optionalLanguages } from '@/data/languages';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { filterAndPaginate, identity } from '@/utils/helpers';
import { useGuardedOnboarding, useOnboardingNavigation } from '@/utils/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Styles from '../styles';

// load languages
const loadLanguages: LoadOptions<
  DropdownOption,
  GroupBase<DropdownOption>,
  null
> = (search, prevOptions) =>
  filterAndPaginate(optionalLanguages, search, prevOptions.length);

// load country, state, city
const loadCountries: LoadOptions<
  DropdownOption,
  GroupBase<DropdownOption>,
  null
> = (search, prevOptions) =>
  filterAndPaginate(countries, search, prevOptions.length);

const loadStates: (
  countryCode: string,
) => LoadOptions<
  DropdownOption,
  GroupBase<DropdownOption>,
  null
> = countryCode => {
  const states: DropdownOption[] = State.getStatesOfCountry(countryCode)
    .map(s => ({ label: s.name, value: s.isoCode }))
    .sort((s1, s2) => s1.label.localeCompare(s2.label));
  return (search, prevOptions) =>
    filterAndPaginate(states, search, prevOptions.length);
};

const loadCities: (
  countryCode: string,
  stateCode: string,
) => LoadOptions<DropdownOption, GroupBase<DropdownOption>, null> = (
  countryCode,
  stateCode,
) => {
  const cities: DropdownOption[] = City.getCitiesOfState(countryCode, stateCode)
    .map(c => ({ label: c.name, value: c.name }))
    .sort((c1, c2) => c1.label.localeCompare(c2.label));
  return (search, prevOptions) =>
    filterAndPaginate(cities, search, prevOptions.length);
};

// define form schema using Zod to automate form validation
const zodDropdownOption = {
  label: z.string(),
  value: z.string(),
};

const basicInformationSchema = z.object({
  firstName: z
    .string({ required_error: 'Please include your first name' })
    .min(1, { message: 'Please include your first name' }),
  lastName: z
    .string({ required_error: 'Please include your last name' })
    .min(1, { message: 'Please include your first name' }),
  country: z
    .object(zodDropdownOption)
    .nullable()
    .refine(val => val, {
      message: 'Please include the country of your primary residence',
    }),
  state: z
    .object(zodDropdownOption)
    .nullable()
    .refine(val => val, {
      message: 'Please include the state of your primary residence',
    }),
  city: z
    .object(zodDropdownOption)
    .nullable()
    .refine(val => val, {
      message: 'Please include the city of your primary residence',
    }),
  phoneNumber: z
    .string({ required_error: 'Please include a phone number' })
    .regex(
      /(^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$)|(^$)/,
      { message: 'Invalid phone number' },
    ),
  canSpeaks: z
    .array(z.object(zodDropdownOption))
    .min(1, 'Please select a value for languages you can speak or understand'),
  canReads: z
    .array(z.object(zodDropdownOption))
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
      canSpeaks: onboarding.canSpeaks.map(l => ({ label: l, value: l })),
      canReads: onboarding.canReads.map(l => ({ label: l, value: l })),
      country: onboarding.location?.country,
      state: onboarding.location?.state,
      city: onboarding.location?.city,
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
        formValues.country &&
        formValues.state &&
        formValues.city &&
        formValues.phoneNumber &&
        formValues.canReads.length > 0 &&
        formValues.canSpeaks.length > 0
      ),
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
  // - validity should be handled by Zod
  const onSubmit = () => {
    push(`/onboarding/${onboarding.flow[2].url}`);
    onboarding.setForm(undefined);
  };

  return (
    <FormProvider {...form}>
      <CardForm onSubmit={form.handleSubmit(onSubmit)}>
        <Styles.BackLink href={backlinkHref}>
          <Icon type="leftArrow" />
        </Styles.BackLink>

        <Styles.RequiredText>Required Fields</Styles.RequiredText>

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
            name="country"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CreatableBigDataDropdown
                    loadOptions={loadCountries}
                    error={fieldState.error?.message}
                    isMulti={false}
                    onChange={v => {
                      onboarding.setLocation({
                        country: v ?? undefined,
                        state: undefined,
                        city: undefined,
                      });
                      field.onChange(v ?? '');
                      form.resetField('state', { defaultValue: null });
                      form.resetField('city', { defaultValue: null });
                    }}
                    value={field.value ?? null}
                    placeholder="Type to search or create a country..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field, fieldState }) => {
              const { country } = form.getValues();
              return (
                <FormItem>
                  <FormLabel>State / Province</FormLabel>
                  <FormControl>
                    <CreatableBigDataDropdown
                      disabled={!country?.label}
                      loadOptions={loadStates(country?.value ?? '')}
                      error={fieldState.error?.message}
                      isMulti={false}
                      onChange={v => {
                        onboarding.setLocation(loc => ({
                          ...loc,
                          state: v ?? undefined,
                          city: undefined,
                        }));
                        field.onChange(v ?? '');
                        form.resetField('city', { defaultValue: null });
                      }}
                      value={field.value ?? null}
                      placeholder={
                        country
                          ? 'Type to search or create a state...'
                          : 'Start by inputting a country'
                      }
                      cacheUniqs={[country]}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => {
              const { country, state } = form.getValues();
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <CreatableBigDataDropdown
                      disabled={!country?.label || !state?.label}
                      loadOptions={loadCities(
                        country?.value ?? '',
                        state?.value ?? '',
                      )}
                      error={fieldState.error?.message}
                      isMulti={false}
                      onChange={v => {
                        onboarding.setLocation(loc => ({
                          ...loc,
                          city: v ?? undefined,
                        }));
                        field.onChange(v ?? '');
                      }}
                      value={field.value ?? null}
                      placeholder={
                        state
                          ? 'Type to search or create a city...'
                          : 'Start by inputting a state'
                      }
                      cacheUniqs={[country, state]}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
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
                  <CreatableBigDataDropdown
                    error={fieldState.error?.message}
                    loadOptions={loadLanguages}
                    isMulti
                    onChange={v => {
                      onboarding.setCanSpeaks(v.map(l => l.label));
                      field.onChange(v);
                    }}
                    value={field.value}
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
                  <CreatableBigDataDropdown
                    error={fieldState.error?.message}
                    loadOptions={loadLanguages}
                    isMulti
                    onChange={v => {
                      onboarding.setCanReads(v.map(l => l.label));
                      field.onChange(v);
                    }}
                    value={field.value}
                    placeholder="Start typing to filter languages..."
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
