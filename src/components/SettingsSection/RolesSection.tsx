import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { roleSchema } from '@/data/formSchemas';
import { roleOptions } from '@/data/roles';
import { Box } from '@/styles/containers';
import { ProfileRole } from '@/types/schema';
import { capitalize, formatEnumeration } from '@/utils/helpers';
import { useProfileAuth } from '@/utils/hooks';
import { SettingField, SettingSection } from '.';
import InputDropdown from '../InputDropdown';

const getDefaults = (
  roles: ProfileRole[],
): Partial<z.infer<typeof roleSchema>> => {
  const roleSet = new Set(roles.map(role => role.role));
  const isAttorney = roleSet.has('ATTORNEY');
  const isLegalFellow = roleSet.has('LEGAL_FELLOW');
  const isInterpreter = roleSet.has('INTERPRETER');
  if (isAttorney && isInterpreter) return { roles: 'ATTORNEY,INTERPRETER' };
  if (isLegalFellow && isInterpreter)
    return { roles: 'LEGAL_FELLOW,INTERPRETER' };
  if (isAttorney) return { roles: 'ATTORNEY' };
  if (isLegalFellow) return { roles: 'LEGAL_FELLOW' };
  if (isInterpreter) return { roles: 'INTERPRETER' };
  return { roles: '' };
};

export default function RolesSection() {
  const { profile } = useProfileAuth();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: getDefaults(profile.roles),
  });

  const onValidSubmit = (values: z.infer<typeof roleSchema>) => {
    console.log(values);
  };

  return (
    <Box>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit)}>
          <SettingSection
            title="Roles"
            canEdit
            isSubmitting={form.formState.isSubmitting}
            isEditing={isEditing}
            startEdit={() => setIsEditing(true)}
            cancelEdit={() => {
              setIsEditing(false);
              form.reset(getDefaults(profile.roles));
            }}
          >
            <SettingField
              control={form.control}
              name="roles"
              label="Selected Roles"
              extractValue={v =>
                formatEnumeration(
                  v.split(',').map(role => capitalize(role.toLowerCase())),
                )
              }
              render={({ field, fieldState }) => (
                <InputDropdown
                  error={!!fieldState.error}
                  onChange={v => field.onChange(v ?? '')}
                  options={roleOptions}
                  defaultValue={field.value}
                  placeholder="Click to select"
                />
              )}
            />
          </SettingSection>
        </form>
      </FormProvider>
    </Box>
  );
}
