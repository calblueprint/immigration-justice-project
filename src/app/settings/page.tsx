'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackLink, H1, H4 } from '@/styles/text';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { cities, languages } from '@/lib/bigData';
import { ImmigrationLawExperienceEnum, RoleEnum } from '@/types/schema';
import { SettingsSectionData } from '@/types/settingsSection';
import SettingsSection from '@/components/SettingsSection';
import { ContentContainer, PageContainer } from './styles';

const rolesOptions = new Map<RoleEnum, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
]);

const legalExperienceOptions = new Map<ImmigrationLawExperienceEnum, string>([
  ['HIGH', 'Multiple cases of immigration law experience'],
  ['MEDIUM', 'Few cases of immigration law experience'],
  ['LOW', 'One or no case of immigration law experience'],
]);

export default function Settings() {
  const { push } = useRouter();

  const [basicInformation, setBasicInformation] = useState<SettingsSectionData>(
    [
      [
        {
          type: 'text',
          label: 'First Name',
          value: 'John',
          validate: v => (v ? '' : 'Must include a first name'),
        },
        {
          type: 'text',
          label: 'Last Name',
          value: 'Doe',
          validate: v => (v ? '' : 'Must include a last name'),
        },
      ],
      {
        type: 'dropdown',
        options: cities,
        label: 'City',
        value: 'Berkeley',
      },
      {
        type: 'dropdown',
        options: languages,
        multi: true,
        label: 'Languages (speak and understand)',
        value: new Set(['English', 'Spanish']),
      },
      {
        type: 'dropdown',
        options: languages,
        multi: true,
        label: 'Languages (read and write)',
        value: new Set(['English', 'Spanish']),
      },
    ],
  );

  const [availability, setAvailability] = useState<SettingsSectionData>([
    {
      type: 'text', // should make number input later
      label: 'Time Commitment',
      value: '10',
      placeholder: '... hours/month',
      editorLabel: 'Time Commitment (hours/month)',
      format: (v: string) => `${v} hours/month`,
    },
    {
      type: 'date',
      label: 'Earliest Available Date',
      value: '2022-10-31',
      editorLabel: 'Earliest Available Date (MM/DD/YYYY)',
      format: (v: string) => {
        const [year, month, day] = v.split('-');
        return `${month}/${day}/${year}`;
      },
    },
    {
      type: 'textarea',
      label: 'Availability Constraints',
      value: '',
      editorLabel: 'Availability Constraints (Optional)',
      format: (v: string) => v || 'N/A',
    },
  ]);

  const [roles, setRoles] = useState<SettingsSectionData>([
    {
      type: 'dropdown',
      options: rolesOptions,
      multi: true,
      label: 'Selected Roles',
      value: new Set(['ATTORNEY', 'INTERPRETER']),
      format: (v: Set<string>) =>
        Array.from(v)
          .map(r => r.charAt(0) + r.toLowerCase().slice(1))
          .join(', '),
    },
    'Attorney-Specific',
    {
      type: 'text',
      label: 'Attorney Bar Number',
      value: '123456',
      format: (v: string) => `#${v}`,
    },
    {
      type: 'dropdown',
      options: legalExperienceOptions,
      label: 'Immigration Law Experience',
      value: 'HIGH',
      format: (v: string | null) => {
        if (legalExperienceOptions.has(v as ImmigrationLawExperienceEnum))
          return (
            legalExperienceOptions.get(v as ImmigrationLawExperienceEnum) || ''
          );
        return '';
      },
    },
  ]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`An error occurred trying to sign out: ${error.message}`);
    }
    push('/login');
  };

  // const resetPassword = () => {
  //   push('/reset-password');
  // };

  return (
    <PageContainer>
      <BackLink href="/cases">Back</BackLink>
      <ContentContainer>
        <H1>Your Profile</H1>

        <SettingsSection
          title="Account"
          data={[
            { type: 'text', label: 'Email', value: 'example@email.com' },
            {
              type: 'text',
              label: 'Password',
              value: 'somerandomkey',
              format: v => '*'.repeat(v.toString().length),
            },
          ]}
        />

        <SettingsSection
          title="Basic Information"
          editable
          onChange={nv => setBasicInformation(nv)}
          data={basicInformation}
        />

        <SettingsSection
          title="Availability"
          editable
          onChange={nv => setAvailability(nv)}
          data={availability}
        />

        <SettingsSection
          title="Role-Specific"
          editable
          onChange={nv => setRoles(nv)}
          data={roles}
        />

        <Button
          $primaryColor={COLORS.redMid}
          $secondaryColor={COLORS.redDark}
          onClick={handleSignOut}
        >
          <H4 $color="white">Sign Out</H4>
        </Button>
      </ContentContainer>
    </PageContainer>
  );
}
