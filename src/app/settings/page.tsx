'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { BackLink, H1, H4 } from '@/styles/text';
import Button, { LinkButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import { cities, languages } from '@/lib/bigData';
import {
  ImmigrationLawExperienceEnum,
  ProfileLanguage,
  ProfileRole,
  RoleEnum,
} from '@/types/schema';
import { SettingsSectionData, SubSectionData } from '@/types/settingsSection';
import SettingsSection from '@/components/SettingsSection';
import { ProfileContext } from '@/utils/ProfileProvider';
import { isValidDate } from '@/utils/helpers';
import { ButtonContainer, ContentContainer, PageContainer } from './styles';

const rolesOptions = new Map<RoleEnum, string>([
  ['ATTORNEY', 'Attorney'],
  ['INTERPRETER', 'Interpreter'],
]);

const legalExperienceOptions = new Map<ImmigrationLawExperienceEnum, string>([
  ['HIGH', 'Multiple cases of immigration law experience'],
  ['MEDIUM', 'Few cases of immigration law experience'],
  ['LOW', 'One or no case of immigration law experience'],
]);

const eoirRegisteredOptions = ['Yes', 'No'];

export default function Settings() {
  const { push } = useRouter();
  const profile = useContext(ProfileContext);

  const userId = useMemo(() => profile?.userId, [profile]);
  const userEmail = useMemo(() => profile?.userEmail, [profile]);

  const [basicInformation, setBasicInformation] = useState<SettingsSectionData>(
    [],
  );
  const [availability, setAvailability] = useState<SettingsSectionData>([]);
  const [roles, setRoles] = useState<SettingsSectionData>([]);
  const [attorneySettings, setAttorneySettings] = useState<SubSectionData>();

  useEffect(() => {
    if (!profile?.profileData) return;

    setBasicInformation([
      [
        {
          type: 'text',
          label: 'First Name',
          value: profile?.profileData?.first_name || '',
          validate: v => (v ? '' : 'Must include a first name'),
        },
        {
          type: 'text',
          label: 'Last Name',
          value: profile?.profileData?.last_name || '',
          validate: v => (v ? '' : 'Must include a last name'),
        },
      ],
      {
        type: 'single-select',
        options: cities,
        label: 'City',
        value: profile?.profileData?.location || '',
        validate: (v: string | null) => (v ? '' : 'Must include your city'),
      },
      {
        type: 'multi-select',
        options: languages,
        label: 'Languages (speak and understand)',
        value: new Set(
          profile?.languages.filter(l => l.can_speak).map(l => l.language_name),
        ),
        validate: (v: Set<string>) =>
          v.size > 0 ? '' : 'Must select at least one language',
      },
      {
        type: 'multi-select',
        options: languages,
        label: 'Languages (read and write)',
        value: new Set(
          profile?.languages.filter(l => l.can_read).map(l => l.language_name),
        ),
        validate: (v: Set<string>) =>
          v.size > 0 ? '' : 'Must select at least one language',
      },
    ]);

    setAvailability([
      {
        type: 'text', // should make number input later
        label: 'Time Commitment',
        value: profile?.profileData?.hours_per_month?.toString() || '',
        placeholder: '... hours/month',
        editorLabel: 'Time Commitment (hours/month)',
        format: (v: string) => `${v} hours/month`,
        validate: (v: string) => {
          if (Number.isNaN(parseInt(v, 10)))
            return 'Time commitment must be a number';
          return v ? '' : 'Must include time commitment';
        },
      },
      {
        type: 'date',
        label: 'Earliest Available Date',
        value: profile?.profileData?.start_date || '',
        editorLabel: 'Earliest Available Date (MM/DD/YYYY)',
        format: (v: string) => {
          const [year, month, day] = v.split('-');
          return `${month.padStart(2, '0')}/${day.padStart(
            2,
            '0',
          )}/${year.padStart(4, '0')}`;
        },
        validate: (v: string) =>
          v && isValidDate(v) ? '' : 'Must include earliest date',
      },
      {
        type: 'textarea',
        label: 'Availability Constraints',
        value: profile?.profileData?.availability_description || '',
        placeholder: "I won't be available from...",
        editorLabel: 'Availability Constraints (Optional)',
        emptyText: 'N/A',
      },
    ]);

    setRoles([
      {
        type: 'multi-select',
        options: rolesOptions,
        label: 'Selected Roles',
        value: new Set(profile?.roles.map(r => r.role)),
        format: (v: Set<string>) =>
          Array.from(v)
            .map(r => r.charAt(0) + r.toLowerCase().slice(1))
            .join(', '),
        validate: (v: Set<string>) =>
          v.size > 0 ? '' : 'Must select at least one role',
      },
    ]);

    setAttorneySettings({
      title: 'Attorney-Specific',
      linkLabel: 'Selected Roles',
      linkValue: 'ATTORNEY',
      data: [
        {
          type: 'text',
          label: 'Attorney Bar Number',
          value: profile?.profileData?.bar_number || '',
          format: (v: string) => `#${v}`,
          validate: (v: string) =>
            Number.isNaN(parseInt(v, 10))
              ? 'For attorneys, must include valid attorney bar number'
              : '',
        },
        {
          type: 'single-select',
          options: legalExperienceOptions,
          label: 'Immigration Law Experience',
          value: profile?.profileData?.immigration_law_experience || '',
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
        {
          type: 'radio',
          options: eoirRegisteredOptions,
          label: 'EOIR Registered',
          value: profile?.profileData?.eoir_registered ? 'Yes' : 'No',
          validate: (v: string) => (v ? '' : 'Must select one option'),
        },
      ],
    });
  }, [profile]);

  const handleSignOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`An error occurred trying to sign out: ${error.message}`);
    }
    push('/login');
  }, [push]);

  const handleUpdateBasicInformation = useCallback(
    (nd: SettingsSectionData) => {
      setBasicInformation(nd);

      if (!profile || !userId) return;

      const sections = nd.flat();
      const firstName = sections.find(sec => sec.label === 'First Name')
        ?.value as string;
      const lastName = sections.find(sec => sec.label === 'Last Name')
        ?.value as string;
      const location = sections.find(sec => sec.label === 'City')
        ?.value as string;

      const canSpeaks = sections.find(
        sec => sec.label === 'Languages (speak and understand)',
      )?.value as Set<string>;
      const canReads = sections.find(
        sec => sec.label === 'Languages (read and write)',
      )?.value as Set<string>;
      const allSpeakRead = new Set(
        Array.from(canReads).concat(Array.from(canSpeaks)),
      );

      const langs: ProfileLanguage[] = Array.from(allSpeakRead).map(l => ({
        user_id: userId,
        can_read: canReads.has(l),
        can_speak: canSpeaks.has(l),
        language_name: l,
      }));

      Promise.all([
        profile.updateProfile({
          first_name: firstName,
          last_name: lastName,
          location,
        }),
        profile.setLanguages(langs),
      ]);
    },
    [userId, profile],
  );

  const handleUpdateAvailability = useCallback(
    (nd: SettingsSectionData) => {
      setAvailability(nd);

      if (!profile || !userId) return;

      const sections = nd.flat();
      const timeCommitment = sections.find(
        sec => sec.label === 'Time Commitment',
      )?.value as string;
      const earliestDate = sections.find(
        sec => sec.label === 'Earliest Available Date',
      )?.value as string;
      const availabilityConstraint = sections.find(
        sec => sec.label === 'Availability Constraints',
      )?.value as string;
      const hoursPerMonth = parseInt(timeCommitment, 10);

      const [year, month, day] = earliestDate
        .split('-')
        .map(s => parseInt(s, 10));
      const localDate = new Date(year, month - 1, day);

      profile.updateProfile({
        start_date: localDate.toISOString(),
        availability_description: availabilityConstraint,
        hours_per_month: hoursPerMonth,
      });
    },
    [userId, profile],
  );

  const handleUpdateRoles = useCallback(
    (nd: SettingsSectionData, ns: SubSectionData[]) => {
      setRoles(nd);
      setAttorneySettings(ns[0]);

      if (!profile || !userId) return;

      const sections = nd.flat();
      const selectedRoles = sections.find(sec => sec.label === 'Selected Roles')
        ?.value as Set<RoleEnum>;

      if (selectedRoles.has('ATTORNEY')) {
        const attorneySections = ns[0].data.flat();
        const barNumber = attorneySections.find(
          sec => sec.label === 'Attorney Bar Number',
        )?.value as string;
        const immLawExp = attorneySections.find(
          sec => sec.label === 'Immigration Law Experience',
        )?.value as ImmigrationLawExperienceEnum;
        const eoirRegistered = attorneySections.find(
          sec => sec.label === 'EOIR Registered',
        )?.value as string;

        if (!barNumber || !immLawExp || !eoirRegistered)
          throw new Error(
            'Attorney must have bar number and immigration law experience',
          );

        profile.updateProfile({
          bar_number: parseInt(barNumber, 10).toString(),
          immigration_law_experience: immLawExp,
          eoir_registered: eoirRegistered === 'Yes',
        });
      }

      const rolesArr: ProfileRole[] = [...selectedRoles].map(r => ({
        user_id: userId,
        role: r,
      }));
      profile.setRoles(rolesArr);
    },
    [userId, profile],
  );

  // const resetPassword = () => {
  //   push('/reset-password');
  // };

  return (
    <PageContainer>
      <BackLink href="/cases">Back</BackLink>
      <ContentContainer>
        <H1>Your Profile</H1>
        {profile?.profileReady && !profile?.profileData && (
          <H4>
            You haven&apos;t completed onboarding yet. Complete onboarding to
            view your profile.
          </H4>
        )}
        {profile?.profileReady && profile?.profileData && (
          <>
            <SettingsSection
              title="Account"
              data={[
                { type: 'text', label: 'Email', value: userEmail || '' },
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
              onSave={handleUpdateBasicInformation}
              data={basicInformation}
            />

            <SettingsSection
              title="Availability"
              editable
              onSave={handleUpdateAvailability}
              data={availability}
            />

            <SettingsSection
              title="Role-Specific"
              editable
              onSave={handleUpdateRoles}
              data={roles}
              subsections={attorneySettings ? [attorneySettings] : []}
            />
          </>
        )}
        <ButtonContainer>
          {profile?.profileReady && !profile.profileData && (
            <LinkButton
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              href="/onboarding/roles"
            >
              <H4 $color="white">Go to Onboarding</H4>
            </LinkButton>
          )}
          <Button
            $primaryColor={COLORS.redMid}
            $secondaryColor={COLORS.redDark}
            onClick={handleSignOut}
          >
            <H4 $color="white">Sign Out</H4>
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
}
