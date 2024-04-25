'use client';

import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BigBlueButton, BigButton } from '@/components/Buttons';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import Icon from '@/components/Icon';
import InputDropdown from '@/components/InputDropdown';
import RadioGroup from '@/components/RadioGroup';
import TextInput from '@/components/TextInput';
import { usStates } from '@/data/citiesAndStates';
import { legalCredentialSchema } from '@/data/formSchemas';
import { CardForm, Flex } from '@/styles/containers';
import { H1Centered } from '@/styles/text';
import { formatTruthy, identity } from '@/utils/helpers';
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

  // scroll to top
  useScrollToTop();

  // initialize form with data from onboarding context
  const form = useForm<z.infer<typeof legalCredentialSchema>>({
    resolver: zodResolver(legalCredentialSchema),
    defaultValues: {
      stateBarred: onboarding.profile.state_barred ?? undefined,
      barNumber: onboarding.profile.bar_number ?? undefined,
      eoirRegistered: onboarding.profile.eoir_registered ?? undefined,
    },
  });

  const formValues = form.watch();
  const isEmpty = useMemo(
    () =>
      !(formValues.stateBarred && formValues.barNumber) ||
      formValues.eoirRegistered === undefined,
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

  const onSubmit = () => {
    push(`/onboarding/${onboarding.flow[pageProgress + 1].url}`);
    onboarding.setForm(undefined);
  };

  return (
    <FormProvider {...form}>
      <CardForm onSubmit={form.handleSubmit(onSubmit)}>
        <Styles.BackLinkButton
          type="button"
          onClick={() => ebbTo(backlinkHref)}
        >
          <Icon type="leftArrow" />
        </Styles.BackLinkButton>

        <Styles.RequiredText>Required Fields</Styles.RequiredText>

        <H1Centered>Legal Credentials</H1Centered>

        <Styles.FormFieldsContainer>
          <FormField
            control={form.control}
            name="stateBarred"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Which state are you barred in?</FormLabel>
                <FormControl>
                  <InputDropdown
                    options={usStates}
                    error={!!fieldState.error}
                    onChange={newValue => {
                      field.onChange(newValue);
                      onboarding.updateProfile({
                        state_barred: newValue ?? undefined,
                      });
                    }}
                    defaultValue={onboarding.profile.state_barred ?? ''}
                    placeholder="Start typing to filter states..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="barNumber"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  What is your attorney bar number in this state?
                </FormLabel>
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
