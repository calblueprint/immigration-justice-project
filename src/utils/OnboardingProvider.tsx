'use client';

import { UUID } from 'crypto';
import {
  Profile,
  ProfileLanguage,
  ProfileRole,
  RoleEnum,
} from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { useProfile } from '@/utils/ProfileProvider';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface FlowData {
  url: string;
  name: string;
}

type FormSubmitter = () => Promise<void>;
type FormSubmitterConstructor = (func: () => void) => FormSubmitter;

interface OnboardingContextType {
  profile: Partial<Profile>;
  canReads: string[];
  canSpeaks: string[];
  roles: RoleEnum[];
  progress: number;
  flow: FlowData[];
  canContinue: boolean;
  formIsDirty: boolean;
  setFormIsDirty: Dispatch<SetStateAction<boolean>>;
  makeFormSubmitter?: FormSubmitterConstructor;
  setFormSubmitter: Dispatch<
    SetStateAction<FormSubmitterConstructor | undefined>
  >;
  updateProfile: (updateInfo: Partial<Profile>) => void;
  clearProfile: () => void;
  flushData: () => Promise<void>;
  setProgress: Dispatch<SetStateAction<number>>;
  setCanContinue: Dispatch<SetStateAction<boolean>>;
  setFlow: Dispatch<SetStateAction<FlowData[]>>;
  setCanReads: Dispatch<SetStateAction<string[]>>;
  setCanSpeaks: Dispatch<SetStateAction<string[]>>;
  setRoles: Dispatch<SetStateAction<RoleEnum[]>>;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export default function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuth();
  const profile = useProfile();
  const [progress, setProgress] = useState(0);
  const [flow, setFlow] = useState<FlowData[]>([]);
  const [userProfile, setUserProfile] = useState<Partial<Profile>>({});
  const [canReads, setCanReads] = useState<string[]>([]);
  const [canSpeaks, setCanSpeaks] = useState<string[]>([]);
  const [roles, setRoles] = useState<RoleEnum[]>([]);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false);
  const [makeFormSubmitter, setFormSubmitter] =
    useState<FormSubmitterConstructor>();

  /**
   * Updates stored profile state with the partial data.
   * Does not affect database.
   */
  const updateProfile = useCallback((updatedInfo: Partial<Profile>) => {
    setUserProfile(oldProfile => ({ ...oldProfile, ...updatedInfo }));
  }, []);

  const clearProfile = useCallback(() => {
    setUserProfile({});
  }, []);

  const flushData = useCallback(async () => {
    if (!auth) throw new Error('Fatal: No auth context provided!');
    if (!profile) throw new Error('Fatal: No profile context provided!');
    if (!auth.userId) throw new Error('Fatal: User is not logged in!');

    const uid: UUID = auth.userId;

    if (!userProfile.first_name)
      throw new Error('Error flushing data: profile missing first name!');

    if (!userProfile.last_name)
      throw new Error('Error flushing data: profile missing last name!');

    if (userProfile.hours_per_month === undefined)
      throw new Error('Error flushing data: profile missing hours per month!');

    if (!userProfile.location)
      throw new Error('Error flushing data: profile missing location!');

    if (!userProfile.start_date)
      throw new Error('Error flushing data: profile missing start date!');

    if (!userProfile.phone_number)
      throw new Error('Error flushing data: profile missing phone number!');

    if (roles.length === 0)
      throw new Error('Error flushing data: roles data is empty!');

    if (roles.includes('ATTORNEY')) {
      if (!userProfile.bar_number)
        throw new Error(
          'Error flushing data: attorney profile missing bar number!',
        );

      if (userProfile.eoir_registered === undefined)
        throw new Error(
          'Error flushing data: attorney profile missing EOIR registered!',
        );
    }

    if (canReads.length + canSpeaks.length === 0)
      throw new Error('Error flushing data: languages data is empty!');

    // format data
    const profileToInsert: Profile = {
      first_name: userProfile.first_name,
      last_name: userProfile.last_name,
      hours_per_month: userProfile.hours_per_month,
      location: userProfile.location,
      start_date: userProfile.start_date,
      availability_description: userProfile.availability_description,
      bar_number: userProfile.bar_number,
      eoir_registered: userProfile.eoir_registered,
      user_id: uid,
      phone_number: userProfile.phone_number,
    };

    const userLangs = new Set(canReads.concat(canSpeaks));
    const langsToInsert: ProfileLanguage[] = Array.from(userLangs).map(l => ({
      user_id: uid,
      can_read: canReads.includes(l),
      can_speak: canSpeaks.includes(l),
      language_name: l,
    }));

    const rolesToInsert: ProfileRole[] = Array.from(roles).map(r => ({
      user_id: uid,
      role: r,
    }));

    await profile.createNewProfile(
      profileToInsert,
      langsToInsert,
      rolesToInsert,
    );
  }, [auth, profile, userProfile, canReads, canSpeaks, roles]);

  const providerValue = useMemo(
    () => ({
      progress,
      profile: userProfile,
      canReads,
      canSpeaks,
      roles,
      flow,
      canContinue,
      formIsDirty,
      setFormIsDirty,
      flushData,
      setFlow,
      setProgress,
      updateProfile,
      clearProfile,
      makeFormSubmitter,
      setFormSubmitter,
      setCanReads,
      setCanSpeaks,
      setRoles,
      setCanContinue,
    }),
    [
      progress,
      userProfile,
      canReads,
      canSpeaks,
      roles,
      flow,
      canContinue,
      formIsDirty,
      setFormIsDirty,
      flushData,
      updateProfile,
      clearProfile,
      setFormSubmitter,
      makeFormSubmitter,
    ],
  );

  return (
    <OnboardingContext.Provider value={providerValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * EXAMPLE USAGE:
 */

/**
 * app/test/layout.tsx

'use client';

import { ReactNode } from 'react';
import OnboardingProvider from '@/utils/OnboardingProvider';

export default function TestLayout({ children }: { children: ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

*/

/**
 * app/test/page.tsx

'use client';

import { useContext, useState } from 'react';
import { OnboardingContext } from '@/utils/OnboardingProvider';
import { RoleEnum } from '@/types/schema';

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [notice, setNotice] = useState<string>('');

  const updateProfile = async () => {
    if (!onboarding) {
      setNotice('No onboarding context detected');
      return;
    }
    setNotice('');

    onboarding
      .flushData()
      .then(() => {
        setNotice('Success!');
      })
      .catch(err => {
        setNotice(err.message);
      });
  };

  return (
    <div>
      <p>Progress: {onboarding && onboarding.progress}</p>
      <button
        type="button"
        onClick={() =>
          onboarding && onboarding.setProgress(onboarding.progress + 1)
        }
      >
        +
      </button>
      <button
        type="button"
        onClick={() =>
          onboarding && onboarding.setProgress(onboarding.progress - 1)
        }
      >
        -
      </button>
      <h4>Profile:</h4>
      <p>User ID: {onboarding && onboarding.profile.user_id}</p>

      <hr />
      {notice && <p>{notice}</p>}

      <p>First name: {onboarding && onboarding.profile.first_name}</p>
      <input
        type="text"
        onBlur={e =>
          onboarding && onboarding.updateProfile({ first_name: e.target.value })
        }
      />
      <p>Last name: {onboarding && onboarding.profile.last_name}</p>
      <input
        type="text"
        onBlur={e =>
          onboarding && onboarding.updateProfile({ last_name: e.target.value })
        }
      />
      <p>Hours per month: {onboarding && onboarding.profile.hours_per_month}</p>
      <input
        type="number"
        onBlur={e =>
          onboarding &&
          onboarding.updateProfile({
            hours_per_month: parseInt(e.target.value, 10),
          })
        }
      />
      <p>Location: {onboarding && onboarding.profile.location}</p>
      <input
        type="text"
        onBlur={e =>
          onboarding && onboarding.updateProfile({ location: e.target.value })
        }
      />
      <p>Start date: {onboarding && onboarding.profile.start_date}</p>
      <input
        type="date"
        onBlur={e =>
          onboarding && onboarding.updateProfile({ start_date: e.target.value })
        }
      />
      <p>
        Roles (comma separated):{' '}
        {onboarding && Array.from(onboarding.roles).join(',')}
      </p>
      <input
        type="text"
        onBlur={e =>
          onboarding &&
          onboarding.setRoles(
            new Set(e.target.value.split(',')) as Set<RoleEnum>,
          )
        }
      />
      <p>
        Can read languages (comma separated):{' '}
        {onboarding && Array.from(onboarding.canReads).join(',')}
      </p>
      <input
        type="text"
        onBlur={e =>
          onboarding &&
          onboarding.setCanReads(new Set(e.target.value.split(',')))
        }
      />
      <p>
        Can speak languages (comma separated):{' '}
        {onboarding && Array.from(onboarding.canSpeaks).join(',')}
      </p>
      <input
        type="text"
        onBlur={e =>
          onboarding &&
          onboarding.setCanSpeaks(new Set(e.target.value.split(',')))
        }
      />
      <br />
      <button type="button" onClick={updateProfile}>
        Update
      </button>
    </div>
  );
}

*/
