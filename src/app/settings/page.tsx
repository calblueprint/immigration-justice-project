'use client';

import { useRouter } from 'next/navigation';
import { BlueLinkButton, RedButton } from '@/components/Buttons';
import {
  ReadOnlySettingField,
  SettingSection,
} from '@/components/SettingsSection';
import AvailabilitySection from '@/components/SettingsSection/AvailabilitySection';
import BasicInformationSection from '@/components/SettingsSection/BasicInformationSection';
import RolesSection from '@/components/SettingsSection/RolesSection';
import { Flex } from '@/styles/containers';
import { H1 } from '@/styles/text';
import { useProfileAuth } from '@/utils/hooks';
import * as Styles from './styles';

export default function Page() {
  const { profile, auth } = useProfileAuth();
  const { push } = useRouter();

  const { profileReady, profileData } = profile;

  const handleSignOut = async () => {
    const error = await auth.signOut();
    if (error) throw new Error(error.message);
    push('/login');
  };

  return (
    <Styles.PageContainer>
      <Styles.ContentContainer>
        <H1>Your Profile</H1>

        <SettingSection title="Account" canEdit={false}>
          <ReadOnlySettingField label="Email" value={auth.userEmail || 'N/A'} />
          <ReadOnlySettingField label="Password" value="*************" />
        </SettingSection>

        {profileReady && profileData && (
          <>
            <BasicInformationSection />
            <AvailabilitySection />
            <RolesSection />
          </>
        )}

        <Flex $justify="between" $align="center">
          <div>
            {profileReady && !profileData && (
              <BlueLinkButton href="/onboarding">
                Go to onboarding
              </BlueLinkButton>
            )}
          </div>
          <RedButton onClick={handleSignOut}>Sign Out</RedButton>
        </Flex>
      </Styles.ContentContainer>
    </Styles.PageContainer>
  );
}
