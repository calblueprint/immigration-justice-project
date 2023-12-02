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
  insertProfile,
  insertLanguages,
  insertRoles,
} from '@/api/supabase/queries/profiles';
import { Profile, ProfileLanguage, ProfileRole } from '@/types/schema';
import { UUID } from 'crypto';
import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface ProfileContextType {
  profileData: Profile | null;
  languages: ProfileLanguage[];
  roles: ProfileRole[];
  userId: UUID | undefined;
  userEmail: string | undefined;
  updateProfile: (newProfileData: Partial<Profile>) => Promise<void>;
  setLanguages: (languages: ProfileLanguage[]) => Promise<void>;
  setRoles: (roles: ProfileRole[]) => Promise<void>;
  createNewProfile: (
    profile: Profile,
    languages: ProfileLanguage[],
    roles: ProfileRole[],
  ) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<UUID | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
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

      const sessionUserEmail = sessionData.session.user.email;
      setUserEmail(sessionUserEmail);

      const sessionUserId = sessionData.session.user.id as UUID;
      setUserId(sessionUserId);

      await Promise.all([
        fetchProfileById(sessionUserId).then(data => setProfileData(data)),
        fetchLanguagesById(sessionUserId).then(data => setProfileLangs(data)),
        fetchRolesById(sessionUserId).then(data => setProfileRoles(data)),
      ]);
    })();
  }, []);

  const providerValue = useMemo(() => {
    /**
     * Creates a new profile associated with the currently
     * logged in user. Errors if user is not logged in or
     * already has a profile. Requires RLS insert access on
     * profiles, profiles-languages, and profiles-roles tables.
     */
    const createNewProfile = async (
      newProfile: Profile,
      newLanguages: ProfileLanguage[],
      newRoles: ProfileRole[],
    ) => {
      if (!userId) throw new Error('Fatal: user is not logged in!');
      if (profileData) throw new Error('Fatal: user already has a profile!');

      await Promise.all([
        insertProfile(newProfile).then(data => setProfileData(data)),
        insertLanguages(newLanguages).then(data => setProfileLangs(data)),
        insertRoles(newRoles).then(data => setProfileRoles(data)),
      ]);
    };

    /**
     * Takes partial info to update the current
     * user's profile. Requires RLS update access
     * setup for the profiles table.
     */
    const updateProfile = async (updatedInfo: Partial<Profile>) => {
      if (!userId) throw new Error('Fatal: user is not logged in');

      const newProfileData = { ...profileData, ...updatedInfo };
      await updateSupabaseProfile(userId, newProfileData)
        .then(data => setProfileData(data))
        .catch((err: Error) => {
          throw new Error(`Error updating profile data: ${err.message}`);
        });
    };

    /**
     * Takes in a new ProfileLanguage data (user_id, language_name, can_read, can_write)
     * list and replaces the user's associated languages entirely.
     * Requires RLS delete, update, and insert access
     * on the profiles-languages table.
     */
    const setLanguages = async (languages: ProfileLanguage[]) => {
      if (!userId) throw new Error('Fatal: user is not logged in');

      // find removed languages
      const toDelete = profileLangs.filter(
        l1 => !languages.find(l2 => l1.language_name === l2.language_name),
      );

      await Promise.all([
        deleteLanguages(userId, toDelete),
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
      if (!userId) throw new Error('Fatal: user is not logged in');

      // find removed roles
      const toDelete = profileRoles.filter(
        r1 => !roles.find(r2 => r1.role === r2.role),
      );

      await Promise.all([
        deleteRoles(userId, toDelete),
        upsertRoles(roles).then(data => setProfileRoles(data)),
      ]);
    };

    return {
      profileData,
      languages: profileLangs,
      roles: profileRoles,
      userId,
      userEmail,
      createNewProfile,
      updateProfile,
      setLanguages,
      setRoles,
    };
  }, [profileData, profileLangs, profileRoles, userId, userEmail]);

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
