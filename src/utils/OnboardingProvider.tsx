'use client';

import {
  Profile,
  ProfileLanguage,
  ProfileRole,
  RoleEnum,
} from '@/types/schema';
import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';
import { UUID } from 'crypto';
import { ProfileContext } from './ProfileProvider';

interface FlowData {
  url: string;
  name: string;
}

interface OnboardingContextType {
  profile: Profile;
  canReads: Set<string>;
  canWrites: Set<string>;
  roles: Set<RoleEnum>;
  progress: number;
  flow: FlowData[];
  canContinue: boolean;
  updateProfile: (updateInfo: Partial<Profile>) => Promise<void>;
  flushData: () => Promise<void>;
  setProgress: Dispatch<SetStateAction<number>>;
  setCanContinue: Dispatch<SetStateAction<boolean>>;
  setFlow: Dispatch<SetStateAction<FlowData[]>>;
  setCanReads: Dispatch<SetStateAction<Set<string>>>;
  setCanWrites: Dispatch<SetStateAction<Set<string>>>;
  setRoles: Dispatch<SetStateAction<Set<RoleEnum>>>;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

const blankProfile: Profile = {
  first_name: '',
  last_name: '',
  hours_per_month: 0,
  location: '',
  start_date: '',
  user_id: '0-0-0-0-0',
};

export default function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const profileCtx = useContext(ProfileContext);
  const [progress, setProgress] = useState(0);
  const [flow, setFlow] = useState<FlowData[]>([]);
  const [profile, setProfile] = useState<Profile>({ ...blankProfile });
  const [canReads, setCanReads] = useState<Set<string>>(new Set());
  const [canWrites, setCanWrites] = useState<Set<string>>(new Set());
  const [roles, setRoles] = useState<Set<RoleEnum>>(new Set());
  const [canContinue, setCanContinue] = useState<boolean>(false);

  const providerValue = useMemo(() => {
    /**
     * Updates stored profile state with the partial data.
     * Does not affect database.
     */
    const updateProfile = async (updatedInfo: Partial<Profile>) => {
      const newProfileData = { ...profile, ...updatedInfo };
      setProfile(newProfileData);
    };

    const flushData = async () => {
      if (!profileCtx) throw new Error('Fatal: No profile context provided!');
      if (profileCtx.userId === undefined)
        throw new Error('Fatal: User is not logged in!');
      const uid: UUID = profileCtx.userId;

      if (profile.first_name === blankProfile.first_name)
        throw new Error('Error flushing data: profile missing first name!');

      if (profile.last_name === blankProfile.last_name)
        throw new Error('Error flushing data: profile missing last name!');

      if (profile.hours_per_month === blankProfile.hours_per_month)
        throw new Error(
          'Error flushing data: profile missing hours per month!',
        );

      if (profile.location === blankProfile.location)
        throw new Error('Error flushing data: profile missing location!');

      if (profile.start_date === blankProfile.start_date)
        throw new Error('Error flushing data: profile missing start date!');

      if (roles.size === 0)
        throw new Error('Error flushing data: roles data is empty!');

      if (roles.has('ATTORNEY')) {
        if (profile.bar_number === undefined)
          throw new Error(
            'Error flushing data: attorney profile missing bar number!',
          );

        if (profile.eoir_registered === undefined)
          throw new Error(
            'Error flushing data: attorney profile missing EOIR registered!',
          );

        if (profile.immigration_law_experience === undefined)
          throw new Error(
            'Error flushing data: attorney profile missing immigration law experience!',
          );
      }

      if (canReads.size === 0)
        throw new Error(
          'Error flushing data: can read languages data is empty!',
        );

      if (canWrites.size === 0)
        throw new Error(
          'Error flushing data: can write languages data is empty!',
        );

      // format data
      const profileToInsert: Profile = {
        ...profile,
        user_id: uid,
      };

      const userLangs = new Set(
        Array.from(canReads).concat(Array.from(canWrites)),
      );
      const langsToInsert: ProfileLanguage[] = Array.from(userLangs).map(l => ({
        user_id: uid,
        can_read: canReads.has(l),
        can_write: canWrites.has(l),
        iso_code: l,
      }));

      const rolesToInsert: ProfileRole[] = Array.from(roles).map(r => ({
        user_id: uid,
        role: r,
      }));

      await profileCtx.createNewProfile(
        profileToInsert,
        langsToInsert,
        rolesToInsert,
      );
    };

    return {
      progress,
      profile,
      canReads,
      canWrites,
      roles,
      flow,
      canContinue,
      flushData,
      setFlow,
      setProgress,
      updateProfile,
      setCanReads,
      setCanWrites,
      setRoles,
      setCanContinue,
    };
  }, [
    progress,
    profile,
    flow,
    canReads,
    canWrites,
    roles,
    canContinue,
    profileCtx,
  ]);

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

export default function Page() {
  const onboarding = useContext(OnboardingContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hoursPerMonth, setHoursPerMonth] = useState(0);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState<string>('');

  const updateProfile = async () => {
    if (!onboarding) {
      setError('No onboarding context detected');
      return;
    }
    setError('');

    await onboarding.updateProfile({
      first_name: firstName,
      last_name: lastName,
      hours_per_month: hoursPerMonth,
      location,
      start_date: startDate,
    });

    setTimeout(() => {
      onboarding.flushProfileData().catch((err: Error) => {
        setError(err.message);
      });
    }, 0);
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
      {error && <p>Error: {error}</p>}

      <p>First name: {onboarding && onboarding.profile.first_name}</p>
      <input type="text" onChange={e => setFirstName(e.target.value)} />
      <p>Last name: {onboarding && onboarding.profile.last_name}</p>
      <input type="text" onChange={e => setLastName(e.target.value)} />
      <p>Hours per month: {onboarding && onboarding.profile.hours_per_month}</p>
      <input
        type="number"
        onChange={e => setHoursPerMonth(parseInt(e.target.value, 10))}
      />
      <p>Location: {onboarding && onboarding.profile.location}</p>
      <input type="text" onChange={e => setLocation(e.target.value)} />
      <p>Start date: {onboarding && onboarding.profile.start_date}</p>
      <input type="date" onChange={e => setStartDate(e.target.value)} />
      <br />
      <button type="button" onClick={updateProfile}>
        Update
      </button>
    </div>
  );
}

*/
