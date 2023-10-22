'use client';

import supabase from '@/api/supabase/createClient';
import { fetchProfileById } from '@/api/supabase/queries/profiles';
import { Profile } from '@/types/schema';
import { UUID } from 'crypto';
import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface ProfileContextType {
  profileData: Profile | null;
  updateProfile: (newProfileData: Profile) => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error) throw error;
      if (
        !sessionData ||
        !sessionData.session ||
        !sessionData.session.user ||
        !sessionData.session.user.id
      )
        return;

      const data = await fetchProfileById(sessionData.session.user.id as UUID);
      setProfileData(data);
    })();
  }, []);

  const providerValue = useMemo(
    () => ({
      profileData,
      updateProfile: setProfileData,
    }),
    [profileData],
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}
