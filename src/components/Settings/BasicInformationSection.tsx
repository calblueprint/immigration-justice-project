import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { basicInformationSchema } from '@/data/formSchemas';
import { loadLanguages } from '@/data/languages';
import { Box, Flex } from '@/styles/containers';
import { ProfileLanguage } from '@/types/schema';
import { formatEnumeration } from '@/utils/helpers';
import { useProfileAuth } from '@/utils/hooks';
import CreatableBigDataDropdown from '../CreatableBigDataDropdown';
import { SettingField, SettingSection } from '../SettingsSection';
import TextInput from '../TextInput';

export default function BasicInformationSection() {
  const { profile, auth } = useProfileAuth();

  const [isEditing, setIsEditing] = useState(false);

  // split languages for rendering
  const { languages: profileLanguages } = profile;
  const canSpeakLangs = useMemo(
    () => profileLanguages.filter(lang => lang.can_speak),
    [profileLanguages],
  );
  const canReadLangs = useMemo(
    () => profileLanguages.filter(lang => lang.can_read),
    [profileLanguages],
  );

  const form = useForm<z.infer<typeof basicInformationSchema>>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      firstName: profile.profileData?.first_name,
      lastName: profile.profileData?.last_name,
      country: profile.profileData?.country,
      state: profile.profileData?.state,
      city: profile.profileData?.city,
      phoneNumber: profile.profileData?.phone_number,
      canReads: canReadLangs.map(lang => ({
        label: lang.language_name,
        value: lang.language_name,
      })),
      canSpeaks: canSpeakLangs.map(lang => ({
        label: lang.language_name,
        value: lang.language_name,
      })),
    },
  });

  // handle save changes
  const onValidSubmit = async (
    values: z.infer<typeof basicInformationSchema>,
  ) => {
    const { userId } = auth;
    if (!userId) throw new Error('Cannot update profile! Are you logged in?');

    const allLangs: Record<string, { read: boolean; speak: boolean }> = {};
    values.canReads.forEach(lang => {
      try {
        allLangs[lang.label].read = true;
      } catch {
        allLangs[lang.label] = { read: true, speak: false };
      }
    });
    values.canSpeaks.forEach(lang => {
      try {
        allLangs[lang.label].speak = true;
      } catch {
        allLangs[lang.label] = { read: false, speak: true };
      }
    });

    const langsToInsert: ProfileLanguage[] = Object.entries(allLangs).map(
      ([lang, literacy]) => ({
        user_id: userId,
        can_read: literacy.read,
        can_speak: literacy.speak,
        language_name: lang,
      }),
    );

    await Promise.all([
      profile.updateProfile({
        first_name: values.firstName,
        last_name: values.lastName,
        country: values.country,
        state: values.state,
        city: values.city,
        phone_number: values.phoneNumber,
      }),
      profile.setLanguages(langsToInsert),
    ]);

    setIsEditing(false);
  };

  return (
    <Box>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit)}>
          <SettingSection
            title="Basic Information"
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={form.formState.isSubmitting}
          >
            <Flex $gap="20px">
              <SettingField
                control={form.control}
                label="First Name"
                name="firstName"
                render={({ field, fieldState }) => (
                  <TextInput
                    errorText={fieldState.error?.message}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Jane"
                  />
                )}
              />

              <SettingField
                control={form.control}
                label="Last Name"
                name="lastName"
                render={({ field, fieldState }) => (
                  <TextInput
                    errorText={fieldState.error?.message}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder="Doe"
                  />
                )}
              />
            </Flex>

            <SettingField
              control={form.control}
              label="Country"
              name="country"
              render={({ field, fieldState }) => (
                <TextInput
                  errorText={fieldState.error?.message}
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="United States"
                />
              )}
            />

            <SettingField
              control={form.control}
              label="State"
              name="state"
              render={({ field, fieldState }) => (
                <TextInput
                  errorText={fieldState.error?.message}
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="California"
                />
              )}
            />

            <SettingField
              control={form.control}
              label="City"
              name="city"
              render={({ field, fieldState }) => (
                <TextInput
                  errorText={fieldState.error?.message}
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="San Diego"
                />
              )}
            />

            <SettingField
              control={form.control}
              label="Phone Number"
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <TextInput
                  errorText={fieldState.error?.message}
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="(123) 456-7890"
                />
              )}
            />

            <SettingField
              control={form.control}
              label="Languages (speak and understand)"
              name="canSpeaks"
              extractValue={v => formatEnumeration(v.map(lang => lang.label))}
              render={({ field, fieldState }) => (
                <CreatableBigDataDropdown
                  error={fieldState.error?.message}
                  loadOptions={loadLanguages}
                  isMulti
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Start typing to filter languages..."
                />
              )}
            />

            <SettingField
              control={form.control}
              label="Languages (read and write)"
              name="canReads"
              extractValue={v => formatEnumeration(v.map(lang => lang.label))}
              render={({ field, fieldState }) => (
                <CreatableBigDataDropdown
                  error={fieldState.error?.message}
                  loadOptions={loadLanguages}
                  isMulti
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Start typing to filter languages..."
                />
              )}
            />
          </SettingSection>
        </form>
      </FormProvider>
    </Box>
  );
}
