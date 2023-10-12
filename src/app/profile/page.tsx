'use client';

import 'crypto';
import React, { useEffect, useState } from 'react';
import {
  fetchProfiles,
  insertProfile,
  updateProfile,
} from '../../api/supabase/queries/profiles';
import { Profile } from '../../types/schema';

import styles from '../page.module.css';

export default function Page() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const allProfiles = await fetchProfiles();
      setProfiles(allProfiles);

      type UUID = `${string}-${string}-${string}-${string}-${string}`;

      const mockProfile: Profile = {
        first_name: 'First',
        last_name: 'Last',
        user_id: crypto.randomUUID() as UUID,
        roles: ['attorney'],
        languages: ['English', 'Spanish'],
        hours_per_month: 40,
        immigration_law_experience: '5 years',
        bar_number: '12345',
        start_date: new Date().toDateString(),
        interest_ids: [crypto.randomUUID()] as UUID[],
        location: 'EXAMPLE LOCATION',
        availability_description: 'No time.',
        eoir_registered: false,
      };

      await insertProfile(mockProfile);

      await updateProfile(mockProfile.user_id, {
        hours_per_month: -200, // Update the roles field with new data
      });

      console.log('test');
    })();
  }, []);

  return (
    <div className={styles.profilePage}>
      <h1>Profiles</h1>

      <ul>
        {profiles.map(profile => (
          <li key={profile.user_id}>
            <h2>Profile ID: {profile.user_id}</h2>
            <p>Location: {profile.location}</p>
            <p>Availability Description: {profile.availability_description}</p>
            <p>EOIR Registered: {profile.eoir_registered}</p>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Roles: {profile.roles.join(', ')}</p>
            <p>Languages: {profile.languages.join(', ')}</p>
            <p>hoursPerMonth: {profile.hours_per_month}</p>
            <p>
              immigrationLawExperience:{' '}
              {profile.immigration_law_experience.toString()}
            </p>
            <p>barNumber: {profile.bar_number.toString()}</p>
            <p>startDate: {profile.start_date.toString()}</p>
            <p>interestIds: {profile.interest_ids.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
