'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackLink, H1, H4 } from '@/styles/text';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import { cities, languages } from '@/lib/bigData';
import { ImmigrationLawExperienceEnum, RoleEnum } from '@/types/schema';
import { SettingsSectionData, SubSectionData } from '@/types/settingsSection';
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
        validate: (v: string | null) => (v ? '' : 'Must include your city'),
      },
      {
        type: 'dropdown',
        options: languages,
        multi: true,
        label: 'Languages (speak and understand)',
        value: new Set(['English', 'Spanish']),
        validate: (v: Set<string>) =>
          v.size > 0 ? '' : 'Must select at least one language',
      },
      {
        type: 'dropdown',
        options: languages,
        multi: true,
        label: 'Languages (read and write)',
        value: new Set(['English', 'Spanish']),
        validate: (v: Set<string>) =>
          v.size > 0 ? '' : 'Must select at least one language',
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
      validate: (v: string) => {
        if (Number.isNaN(v)) return 'Time commitment must be a number';
        return v ? '' : 'Must include time commitment';
      },
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
      validate: (v: string) =>
        v ? '' : 'Must include earliest available date',
    },
    {
      type: 'textarea',
      label: 'Availability Constraints',
      value: '',
      placeholder: "I won't be available from...",
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
      validate: (v: Set<string>) =>
        v.size > 0 ? '' : 'Must select at least one role',
    },
  ]);

  const [attorneySettings, setAttorneySettings] = useState<SubSectionData>({
    title: 'Attorney-Specific',
    linkLabel: 'Selected Roles',
    linkValue: 'ATTORNEY',
    data: [
      {
        type: 'text',
        label: 'Attorney Bar Number',
        value: '123456',
        format: (v: string) => `#${v}`,
        validate: (v: string) =>
          v ? '' : 'For attorneys, must include attorney bar number',
      },
      {
        type: 'dropdown',
        options: legalExperienceOptions,
        label: 'Immigration Law Experience',
        value: 'HIGH',
        format: (v: string | null) => {
          if (legalExperienceOptions.has(v as ImmigrationLawExperienceEnum))
            return (
              legalExperienceOptions.get(v as ImmigrationLawExperienceEnum) ||
              ''
            );
          return '';
        },
        validate: (v: string | null) =>
          v ? '' : 'For attorneys, must include immigration law experience',
      },
    ],
  });

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
          subsections={[attorneySettings]}
          onSubSectionChange={([nv]) => setAttorneySettings(nv)}
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
