'use client';

import { UUID } from 'crypto';
import { useState } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H1 } from '@/styles/text';
import TextInput from '@/components/TextInput';
import { Open_Sans } from 'next/font/google';
import { insertProfile } from '../../api/supabase/queries/profiles';
import { Profile } from '../../types/schema';
import styles from '../page.module.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Profile() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleInsert = async () => {
    if (!firstName || !lastName) return;
    const newProfile: Profile = {
      // hardcoded values for now
      user_id: crypto.randomUUID() as UUID,
      roles: ['blah'],
      languages: ['blah', 'blah'],
      accreditations: ['blah'],
      hours_per_week: 40,
      immigration_law_experience: '5 years',
      bar_number: '12345',
      start_date: new Date().toDateString(),
      interest_ids: [crypto.randomUUID()] as UUID[],
      first_name: firstName,
      last_name: lastName,
    };
    await insertProfile(newProfile);
    setFirstName('');
    setLastName('');
  };

  const InfoForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5 rem; // 40 px
    padding: 3.25 rem; // 52 px = 13/4
    border-radius: 0.625 rem;
    border: 2px solid ${COLORS.abaBlue};
    align-items: center;
    justify-content: center;
    max-width: 700px;
    margin: 0 auto;
  `;

  const Header1 = styled.h1`
    display: block;
    font-size: 2rem;
    font-size: 3 rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    ${openSans.style}
    color: ${COLORS.dark};
    margin: 0 auto;
    justify-content: center;
    max-width: 500px;
  `;

  const SecondDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    max-width: 400px;
  `;

  const ThirdDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    max-width: 400px;
  `;

  return (
    <InfoForm>
      <Header1>Basic Information</Header1>
      <SecondDiv>
        <ThirdDiv>
          <TextInput
            label="First Name"
            placeholder="Rahi"
            erroring={false}
            type="firstName"
            name="firstName"
            setValue={setFirstName}
            value="firstName"
            errorText="error"
          />
          <TextInput
            label="Last Name"
            placeholder="Hazra"
            erroring={false}
            type="lastName"
            name="lastName"
            setValue={setLastName}
            value="lastName"
            errorText="error"
          />
        </ThirdDiv>
      </SecondDiv>
      <SecondDiv>
        <button type="button" onClick={handleInsert}>
          Submit
        </button>
      </SecondDiv>
    </InfoForm>
  );
}
