'use client';

import supabase from '@/api/supabase/createClient';
import {
  fetchProfileById,
  updateProfile as updateSupabaseProfile,
} from '@/api/supabase/queries/profiles';
import { Profile } from '@/types/schema';
import { UUID } from 'crypto';
import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface ProfileContextType {
  profileData: Profile | null;
  updateProfile: (newProfileData: Partial<Profile>) => void;
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

  const providerValue = useMemo(() => {
    const updateProfile = async (updatedInfo: Partial<Profile>) => {
      if (!profileData || !profileData.user_id)
        throw new Error(
          `Expected profileData to be valid, but got ${profileData}`,
        );

      const newProfileData = { ...profileData, ...updatedInfo };
      setProfileData(newProfileData);
      await updateSupabaseProfile(profileData.user_id, newProfileData);
    };

    return {
      profileData,
      updateProfile,
    };
  }, [profileData]);

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * EXAMPLE USAGE:
 *
 * app/test/layout.tsx:
 */

/**
 * 'use client';
 *
 * import { ReactNode } from 'react';
 * import ProfileProvider from '@/utils/ProfileProvider';
 *
 * export default function TestLayout({ children }: { children: ReactNode }) {
 *   return <ProfileProvider>{children}</ProfileProvider>;
 * }
 */

/**
 * app/test/page.tsx:
 */

/** 'use client';
 *
 * import { useContext, useState } from 'react';
 * import { ProfileContext } from '@/utils/ProfileProvider';
 *
 * export default function Page() {
 *   const profile = useContext(ProfileContext);
 *   const [name, setName] = useState("");
 *
 *   return (
 *     <div>
 *       <h1>{(profile && profile.profileData) ? profile.profileData.first_name : 'NULL'}</h1>
 *       <input type="text" onChange={e => setName(e.target.value)} />
 *       <button type="button" onClick={() => profile?.updateProfile({ first_name: name })}>Change Name</button>
 *     </div>
 *   );
 * }
 */
