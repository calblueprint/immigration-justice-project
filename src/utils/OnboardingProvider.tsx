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
  flushData: () => void;
  updateProfile: (updateInfo: Partial<Profile>) => void;
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
      if (
        profile.first_name === blankProfile.first_name ||
        profile.last_name === blankProfile.last_name ||
        profile.hours_per_month === blankProfile.hours_per_month ||
        profile.location === blankProfile.location ||
        profile.start_date === blankProfile.start_date ||
        profile.user_id === blankProfile.user_id
      )
        throw new Error(
          `Profile may be missing some fields! Expected first_name, last_name, hours_per_month, location, start_date, and user_id to be non-empty, but got: ${profile}`,
        );

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
