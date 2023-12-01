'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackLink, H1, H4 } from '@/styles/text';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import SettingsSection from '@/components/SettingsSection';
import { cities, languages } from '@/lib/bigData';
import { ImmigrationLawExperienceEnum, RoleEnum } from '@/types/schema';
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
          data={[
            [
              { type: 'text', label: 'First Name', value: 'John' },
              { type: 'text', label: 'Last Name', value: 'Doe' },
            ],
            {
              type: 'dropdown',
              options: cities,
              label: 'City',
              value: 'Berkeley',
            },
            {
              type: 'text', // should make number input later
              label: 'Time Commitment',
              value: '10',
              placeholder: 'Hrs/month',
              format: v => `${v} hours/month`,
            },
          ]}
        />

        <SettingsSection
          title="Languages"
          editable
          data={[
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
          ]}
        />

        <SettingsSection
          title="Role-Specific"
          editable
          data={[
            {
              type: 'dropdown',
              options: rolesOptions,
              multi: true,
              label: 'Selected Roles',
              value: new Set(['ATTORNEY', 'INTERPRETER']),
              format: (v: Set<string>) =>
                Array.from(v)
                  .map(r => r.charAt(0) + r.toLowerCase())
                  .join(', '),
            },
            'Attorney-Specific',
            {
              type: 'text',
              label: 'Attorney Bar Number',
              value: '12345678',
              format: v => {
                const n = v.padStart(8, '0');
                return `${n.substring(0, 2)}-${n.substring(2, 6)}-${n.substring(
                  6,
                )}`;
              },
            },
            {
              type: 'dropdown',
              options: legalExperienceOptions,
              label: 'Immigration Law Experience',
              value: 'HIGH',
              format: (v: string | null) => {
                if (
                  legalExperienceOptions.has(v as ImmigrationLawExperienceEnum)
                )
                  return (
                    legalExperienceOptions.get(
                      v as ImmigrationLawExperienceEnum,
                    ) || ''
                  );
                return '';
              },
            },
          ]}
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
