'use client';

import * as SettingsSection from '@/components/SettingsSection';
import { BackLink, H1 } from '@/styles/text';
import * as Styles from './styles';

export default function page() {
  return (
    <Styles.PageContainer>
      <BackLink href="/">Back</BackLink>
      <Styles.ContentContainer>
        <H1>Your Profile</H1>

        <SettingsSection.Root
          label="Basic Information"
          viewMode="viewing"
          canEdit
          editMode="editing"
        />
      </Styles.ContentContainer>
    </Styles.PageContainer>
  );
}
