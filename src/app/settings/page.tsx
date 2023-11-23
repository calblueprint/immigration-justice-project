'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackLink, H1, H4 } from '@/styles/text';
import Button from '@/components/Button';
import COLORS from '@/styles/colors';
import SettingsSection from '@/components/SettingsSection';
import { ContentContainer, PageContainer } from './styles';

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
            { label: 'Email', value: 'example@email.com' },
            {
              label: 'Password',
              value: 'somerandomkey',
              format: v => '*'.repeat(v.toString().length),
            },
          ]}
        />

        <SettingsSection
          title="Basic Information"
          data={[
            [
              { label: 'First Name', value: 'John' },
              { label: 'Last Name', value: 'Doe' },
            ],
            { label: 'City', value: 'Berkeley' },
            {
              label: 'Time Commitment',
              value: 10,
              format: v => `${v} hours/week`,
            },
          ]}
        />

        <SettingsSection
          title="Languages"
          data={[
            {
              label: 'Languages (speak and understand)',
              value: ['English', 'Spanish'],
            },
            {
              label: 'Languages (read and write)',
              value: ['English', 'Spanish'],
            },
          ]}
        />

        <SettingsSection
          title="Role-Specific"
          data={[
            {
              label: 'Selected Roles',
              value: ['Attorney', 'Interpreter'],
            },
            'Attorney-Specific',
            {
              label: 'Attorney Bar Number',
              value: 12345678,
              format: v => {
                const n = v.toString().padStart(8, '0');
                return `${n.substring(0, 2)}-${n.substring(2, 6)}-${n.substring(
                  6,
                )}`;
              },
            },
            {
              label: 'Immigration Law Experience',
              value: 'Multiple cases of immigration law experience',
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
