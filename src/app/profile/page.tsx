'use client';

import React, { useEffect, useState } from 'react';
import { fetchProfiles } from '../../api/supabase/queries/profiles';
import { Profile } from '../../types/schema';

export default function Page() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const allProfiles = await fetchProfiles();
      setProfiles(allProfiles);

      /** 
      type UUID = `${string}-${string}-${string}-${string}-${string}`;

      const mockProfile = {
        first_name: 'First',
        last_name: 'Last',
        user_id: crypto.randomUUID() as UUID,
        roles: ['attorney'],
        languages: ['English', 'Spanish'],
        accreditations: ['Bar Association'],
        hours_per_week: 40,
        immigration_law_experience: 'advanced',
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
    })();
  }, []);

  return (
    <div>
      <h1>Profiles</h1>

      <ul>
        {profiles.map(profile => (
          <li key={profile.user_id}>
            <h2>Profile ID: {profile.user_id}</h2>
<<<<<<< HEAD
            <p>Roles: {profile.roles.join(', ')}</p>
            <p>Languages: {profile.languages.join(', ')}</p>
            <p>Accreditations: {profile.accreditations.join(', ')}</p>
            <p>hoursPerWeek: {profile.hours_per_week.toString()}</p>
=======
            <p>Location: {profile.location}</p>
            <p>Availability Description: {profile.availability_description}</p>
            <p>EOIR Registered: {profile.eoir_registered}</p>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>hoursPerMonth: {profile.hours_per_month}</p>
>>>>>>> 5b0b30c95144186f7f5a870ea5ed1b8238113152
            <p>
              immigrationLawExperience:{' '}
              {profile.immigration_law_experience &&
                profile.immigration_law_experience.toString()}
            </p>
            {profile.bar_number && (
              <p>barNumber: {profile.bar_number.toString()}</p>
            )}
            <p>startDate: {profile.start_date.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
