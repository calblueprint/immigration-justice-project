'use client';

import supabase from '@/api/supabase/createClient';
import { upsertProfile } from '@/api/supabase/queries/profiles';
import { Profile, RoleEnum } from '@/types/schema';
import { UUID } from 'crypto';
import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

interface OnboardingContextType {
  profile: Profile;
  progress: number;
  flow: RoleEnum | null;
  flushData: () => Promise<void>;
  updateProfile: (updateInfo: Partial<Profile>) => Promise<void>;
  setProgress: Dispatch<SetStateAction<number>>;
  setFlow: Dispatch<SetStateAction<RoleEnum | null>>;
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
  const [progress, setProgress] = useState(0);
  const [flow, setFlow] = useState<RoleEnum | null>(null);
  const [profile, setProfile] = useState<Profile>(blankProfile);

  useEffect(() => {
    (async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error) throw error;

      const userId = sessionData?.session?.user.id;
      if (userId) {
        setProfile({ ...blankProfile, user_id: userId as UUID });
      }
    })();
  }, []);

  const providerValue = useMemo(() => {
    /**
     * Updates stored profile state with the partial data.
     * Does not affect database.
     */
    const updateProfile = async (updatedInfo: Partial<Profile>) => {
      const newProfileData = { ...profile, ...updatedInfo };
      setProfile(newProfileData);
    };

    /**
     * Flushes stored data with Supabase.
     * Requires RLS insert and update policy on the profiles table.
     */
    const flushData = async () => {
      // validate profile
      if (profile.first_name === blankProfile.first_name)
        throw new Error('Profile is missing first name!');

      if (profile.last_name === blankProfile.last_name)
        throw new Error('Profile is missing last name!');

      if (profile.hours_per_month === blankProfile.hours_per_month)
        throw new Error('Profile is missing hours per month!');

      if (profile.location === blankProfile.location)
        throw new Error('Profile is missing location!');

      if (profile.start_date === blankProfile.start_date)
        throw new Error('Profile is missing start date!');

      if (profile.user_id === blankProfile.user_id)
        throw new Error('Profile is missing user id!');

      // upsert
      await upsertProfile(profile);
    };

    const val: OnboardingContextType = {
      progress,
      profile,
      flow,
      setFlow,
      setProgress,
      updateProfile,
      flushData,
    };

    return val;
  }, [progress, profile, flow]);

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
      <p>Flow: {onboarding && onboarding.flow}</p>
      <button
        type="button"
        onClick={() =>
          onboarding &&
          onboarding.setFlow(
            onboarding.flow === 'INTERPRETER' ? 'ATTORNEY' : 'INTERPRETER',
          )
        }
      >
        Toggle Flow
      </button>
      <h4>Profile:</h4>
      <p>User ID: {onboarding && onboarding.profile.user_id}</p>
      <hr />
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
      <button
        type="button"
        onClick={async () => {
          if (!onboarding) return;

          await onboarding.updateProfile({
            first_name: firstName,
            last_name: lastName,
            hours_per_month: hoursPerMonth,
            location,
            start_date: startDate,
          });

          setTimeout(() => {
            onboarding.flushData();
          }, 0);
        }}
      >
        Update
      </button>
    </div>
  );
}

*/
