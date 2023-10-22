'use client';

import { useContext } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';

export default function Page() {
  const profile = useContext(ProfileContext);

  return (
    <div>
      hi{' '}
      {profile && profile.profileData ? profile.profileData.first_name : 'NULL'}
    </div>
  );
}
