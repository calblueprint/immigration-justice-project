'use client';

import { ProfileContext } from '@/utils/ProfileProvider';
import React, { useContext, useState } from 'react';

export default function Page() {
  const profile = useContext(ProfileContext);
  const [name, setName] = useState('');

  return (
    <div>
      <h1>
        hi{' '}
        {profile && profile.profileData
          ? profile.profileData.first_name
          : 'NULL'}
      </h1>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button
        type="button"
        onClick={() => profile?.updateProfile({ first_name: name })}
      >
        Change Name
      </button>
    </div>
  );
}
