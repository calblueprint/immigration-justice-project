import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { availabilitySchema } from '@/data/formSchemas';
import { Box } from '@/styles/containers';
import {
  getCurrentDate,
  parseDate,
  parseDateAlt,
  parseDateString,
  timestampStringToDate,
} from '@/utils/helpers';
import { useProfileAuth } from '@/utils/hooks';
import DateInput from '../DateInput';
import { SettingField, SettingSection } from '../SettingsSection';
import TextAreaInput from '../TextAreaInput';
import TextInput from '../TextInput';

export default function AvailabilitySection() {
  const { profile } = useProfileAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState<string>(
    profile.profileData?.start_date
      ? parseDateAlt(timestampStringToDate(profile.profileData.start_date))
      : '',
  );

  const form = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availability: profile.profileData?.availability_description,
      hoursPerMonth: profile.profileData?.hours_per_month,
      startDate: profile.profileData?.start_date
        ? new Date(profile.profileData.start_date)
        : undefined,
    },
  });

  const onValidSubmit = async (values: z.infer<typeof availabilitySchema>) => {
    await profile.updateProfile({
      hours_per_month: values.hoursPerMonth,
      start_date: values.startDate,
      availability_description: values.availability ?? undefined,
    });

    setIsEditing(false);
  };

  return (
    <Box>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit)}>
          <SettingSection
            title="Availability"
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={form.formState.isSubmitting}
          >
            <SettingField
              control={form.control}
              name="hoursPerMonth"
              label="Time Commitment (hrs/month)"
              render={({ field, fieldState }) => (
                <TextInput
                  errorText={fieldState.error?.message}
                  placeholder="x hours per month"
                  inputMode="numeric"
                  defaultValue={
                    field.value !== undefined ? field.value.toString() : ''
                  }
                  onChange={newValue => {
                    if (!newValue) {
                      field.onChange(undefined);
                      return;
                    }

                    const toNum = z.coerce.number().safeParse(newValue);
                    const num = toNum.success ? toNum.data : undefined;

                    field.onChange(num);
                  }}
                />
              )}
            />

            <SettingField
              control={form.control}
              name="startDate"
              label="Earliest Available Date"
              extractValue={v => (v ? parseDate(v) : 'N/A')}
              render={({ field, fieldState }) => (
                <DateInput
                  error={fieldState.error?.message}
                  min={parseDateAlt(getCurrentDate())}
                  value={startDate}
                  setValue={setStartDate}
                  onChange={newValue => {
                    field.onChange(parseDateString(newValue));
                  }}
                />
              )}
            />

            <SettingField
              control={form.control}
              name="availability"
              label="Availability Constraints (optional)"
              required={false}
              extractValue={v => v ?? ''}
              render={({ field, fieldState }) => (
                <TextAreaInput
                  placeholder="I won't be available from..."
                  defaultValue={field.value ?? ''}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </SettingSection>
        </form>
      </FormProvider>
    </Box>
  );
}
