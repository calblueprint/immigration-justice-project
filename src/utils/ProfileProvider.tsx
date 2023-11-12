'use client';

import supabase from '@/api/supabase/createClient';
import {
  deleteLanguages,
  deleteRoles,
  fetchProfileById,
  upsertRoles,
  updateProfile as updateSupabaseProfile,
  upsertLanguages,
  fetchRolesById,
  fetchLanguagesById,
} from '@/api/supabase/queries/profiles';
import { Profile, ProfileLanguage, ProfileRole } from '@/types/schema';
import { UUID } from 'crypto';
import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface ProfileContextType {
  profileData: Profile | null;
  languages: ProfileLanguage[];
  roles: ProfileRole[];
  updateProfile: (newProfileData: Partial<Profile>) => void;
  setLanguages: (languages: ProfileLanguage[]) => void;
  setRoles: (roles: ProfileRole[]) => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileLangs, setProfileLangs] = useState<ProfileLanguage[]>([]);
  const [profileRoles, setProfileRoles] = useState<ProfileRole[]>([]);

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

      const userId = sessionData.session.user.id as UUID;

      await Promise.all([
        fetchProfileById(userId).then(data => setProfileData(data)),
        fetchLanguagesById(userId).then(data => setProfileLangs(data)),
        fetchRolesById(userId).then(data => setProfileRoles(data)),
      ]);
    })();
  }, []);

  const providerValue = useMemo(() => {
    /**
     * Takes partial info to update the current
     * user's profile. Requires RLS update access
     * setup for the profiles table.
     */
    const updateProfile = async (updatedInfo: Partial<Profile>) => {
      if (!profileData || !profileData.user_id)
        throw new Error(
          `Expected profileData to be valid, but got ${profileData}`,
        );

      const newProfileData = { ...profileData, ...updatedInfo };
      await updateSupabaseProfile(profileData.user_id, newProfileData)
        .then(data => setProfileData(data))
        .catch((err: Error) => {
          throw new Error(`Error updating profile data: ${err.message}`);
        });
    };

    /**
     * Takes in a new ProfileLanguage data (user_id, iso_code, can_read, can_write)
     * list and replaces the user's associated languages entirely.
     * Requires RLS delete, update, and insert access
     * on the profiles-languages table.
     */
    const setLanguages = async (languages: ProfileLanguage[]) => {
      if (!profileData || !profileData.user_id)
        throw new Error(
          `Expected profileData to be valid, but got ${profileData}`,
        );

      // find removed languages
      const toDelete = profileLangs.filter(
        l1 => !languages.find(l2 => l1.iso_code === l2.iso_code),
      );

      await Promise.all([
        deleteLanguages(profileData.user_id, toDelete),
        upsertLanguages(languages).then(data => setProfileLangs(data)),
      ]);
    };

    /**
     * Takes in a ProfileRole (user_id, role) list
     * and replaces the user's associated roles entirely.
     * Requires RLS delete, insert, and update policy
     * setup on the profiles-roles table.
     */
    const setRoles = async (roles: ProfileRole[]) => {
      if (!profileData || !profileData.user_id)
        throw new Error(
          `Expected profileData to be valid, but got ${profileData}`,
        );

      // find removed roles
      const toDelete = profileRoles.filter(
        r1 => !roles.find(r2 => r1.role === r2.role),
      );

      await Promise.all([
        deleteRoles(profileData.user_id, toDelete),
        upsertRoles(roles).then(data => setProfileRoles(data)),
      ]);
    };

    return {
      profileData,
      languages: profileLangs,
      roles: profileRoles,
      updateProfile,
      setLanguages,
      setRoles,
    };
  }, [profileData, profileLangs, profileRoles]);

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * EXAMPLE USAGE:
 */

/** app/test/layout.tsx:

'use client';

import { ReactNode } from 'react';
import ProfileProvider from '@/utils/ProfileProvider';

export default function TestLayout({ children }: { children: ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}

*/

/** app/test/page.tsx:
'use client';

import { useContext, useState } from 'react';
import { ProfileContext } from '@/utils/ProfileProvider';

export default function Page() {
  const profile = useContext(ProfileContext);
  const [name, setName] = useState('');

  return (
    <div>
      <h1>
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
      <ol>
        {profile &&
          profile.languages &&
          profile.languages.map(l => (
            <li key={l.iso_code}>
              {l.iso_code}, READ: {l.can_read ? 'YES' : 'NO'}, WRITE:{' '}
              {l.can_write ? 'YES' : 'NO'}
            </li>
          ))}
      </ol>
      <ol>
        {profile &&
          profile.roles &&
          profile.roles.map(r => <li key={r.role}>{r.role}</li>)}
      </ol>
    </div>
  );
}

*/
