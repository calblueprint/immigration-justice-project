'use client';

import {
  ReadOnlySettingField,
  SettingSection,
} from '@/components/SettingsSection';
import AvailabilitySection from '@/components/SettingsSection/AvailabilitySection';
import BasicInformationSection from '@/components/SettingsSection/BasicInformationSection';
import { BackLink, H1 } from '@/styles/text';
import { useProfileAuth } from '@/utils/hooks';
import * as Styles from './styles';

export default function Page() {
  const { profile, auth } = useProfileAuth();

  return (
    <Styles.PageContainer>
      <BackLink href="/">Back</BackLink>
      <Styles.ContentContainer>
        <H1>Your Profile</H1>

        <SettingSection title="Account" canEdit={false}>
          <ReadOnlySettingField label="Email" value={auth.userEmail || 'N/A'} />
          <ReadOnlySettingField label="Password" value="*************" />
        </SettingSection>

        {profile.profileReady && (
          <>
            <BasicInformationSection />
            <AvailabilitySection />
          </>
        )}
      </Styles.ContentContainer>
    </Styles.PageContainer>
  );
}
