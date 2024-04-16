'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  deleteLanguages,
  deleteRoles,
  fetchLanguagesById,
  fetchProfileById,
  fetchRolesById,
  insertLanguages,
  insertProfile,
  insertRoles,
  updateProfile as updateSupabaseProfile,
  upsertLanguages,
  upsertRoles,
} from '@/api/supabase/queries/profiles';
import { Profile, ProfileLanguage, ProfileRole } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';

interface ProfileContextType {
  profileData: Profile | null;
  languages: ProfileLanguage[];
  roles: ProfileRole[];
  profileReady: boolean;
  updateProfile: (newProfileData: Partial<Profile>) => Promise<void>;
  setLanguages: (languages: ProfileLanguage[]) => Promise<void>;
  setRoles: (roles: ProfileRole[]) => Promise<void>;
  createNewProfile: (
    profile: Profile,
    languages: ProfileLanguage[],
    roles: ProfileRole[],
  ) => Promise<void>;
  loadProfile: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export const useProfile = () => useContext(ProfileContext);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [profileReady, setProfileReady] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileLangs, setProfileLangs] = useState<ProfileLanguage[]>([]);
  const [profileRoles, setProfileRoles] = useState<ProfileRole[]>([]);

  const loadProfile = useCallback(async () => {
    setProfileReady(false);

    if (!auth?.userId) return;

    await Promise.all([
      fetchProfileById(auth.userId).then(data => setProfileData(data)),
      fetchLanguagesById(auth.userId).then(data => setProfileLangs(data)),
      fetchRolesById(auth.userId).then(data => setProfileRoles(data)),
    ]);

    setProfileReady(true);
  }, [auth]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /**
   * Creates a new profile associated with the currently
   * logged in user. Errors if user is not logged in or
   * already has a profile. Requires RLS insert access on
   * profiles, profiles-languages, and profiles-roles tables.
   */
  const createNewProfile = useCallback(
    async (
      newProfile: Profile,
      newLanguages: ProfileLanguage[],
      newRoles: ProfileRole[],
    ) => {
      if (!auth?.userId) throw new Error('Fatal: user is not logged in!');
      if (profileData) throw new Error('Fatal: user already has a profile!');
      if (auth.userId !== newProfile.user_id)
        throw new Error('Fatal: user id does not match profile user id!');

      await insertProfile(newProfile).then(data => setProfileData(data));

      await Promise.all([
        insertLanguages(newLanguages).then(data => setProfileLangs(data)),
        insertRoles(newRoles).then(data => setProfileRoles(data)),
      ]);
    },
    [auth, profileData],
  );

  /**
   * Takes partial info to update the current
   * user's profile. Requires RLS update access
   * setup for the profiles table.
   */
  const updateProfile = useCallback(
    async (updatedInfo: Partial<Profile>) => {
      if (!auth?.userId) throw new Error('Fatal: user is not logged in');
      if (auth.userId !== profileData?.user_id)
        throw new Error('Fatal: user id does not match profile user id!');

      const newProfileData = { ...profileData, ...updatedInfo };
      await updateSupabaseProfile(auth.userId, newProfileData)
        .then(data => setProfileData(data))
        .catch((err: Error) => {
          throw new Error(`Error updating profile data: ${err.message}`);
        });
    },
    [auth, profileData],
  );

  /**
   * Takes in a new ProfileLanguage data (user_id, language_name, can_read, can_write)
   * list and replaces the user's associated languages entirely.
   * Requires RLS delete, update, and insert access
   * on the profiles-languages table.
   */
  const setLanguages = useCallback(
    async (languages: ProfileLanguage[]) => {
      if (!auth?.userId) throw new Error('Fatal: user is not logged in');

      // find removed languages
      const toDelete = profileLangs.filter(
        l1 => !languages.find(l2 => l1.language_name === l2.language_name),
      );

      await Promise.all([
        deleteLanguages(auth.userId, toDelete),
        upsertLanguages(languages).then(data => setProfileLangs(data)),
      ]);
    },
    [auth, profileLangs],
  );

  /**
   * Takes in a ProfileRole (user_id, role) list
   * and replaces the user's associated roles entirely.
   * Requires RLS delete, insert, and update policy
   * setup on the profiles-roles table.
   */
  const setRoles = useCallback(
    async (roles: ProfileRole[]) => {
      if (!auth?.userId) throw new Error('Fatal: user is not logged in');

      // find removed roles
      const toDelete = profileRoles.filter(
        r1 => !roles.find(r2 => r1.role === r2.role),
      );

      await Promise.all([
        deleteRoles(auth.userId, toDelete),
        upsertRoles(roles).then(data => setProfileRoles(data)),
      ]);
    },
    [auth, profileRoles],
  );

  const providerValue = useMemo(
    () => ({
      profileData,
      languages: profileLangs,
      roles: profileRoles,
      profileReady,
      createNewProfile,
      updateProfile,
      setLanguages,
      setRoles,
      loadProfile,
    }),
    [
      profileData,
      profileLangs,
      profileRoles,
      profileReady,
      createNewProfile,
      updateProfile,
      setLanguages,
      setRoles,
      loadProfile,
    ],
  );

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
            <li key={l.language_name}>
              {l.language_name}, READ: {l.can_read ? 'YES' : 'NO'}, WRITE:{' '}
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
