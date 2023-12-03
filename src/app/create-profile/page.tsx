'use client';

import { UUID } from 'crypto';
import { useState } from 'react';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H1, H4, P } from '@/styles/text';
import TextInput from '@/components/TextInput/index';
import { Open_Sans } from 'next/font/google';
import { insertProfile } from '../../api/supabase/queries/profiles';
import { Profile } from '../../types/schema';
import styles from '../page.module.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Profile() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  // const [userid, setUserId] = useState<string>('');
  // const [Roles, setRoles] = useState<string[]>([]);
  // const [Languages, setLanguages] = useState<string[]>([]);
  // const [hoursPerMonth, sethoursPerMonth] = useState<number>(0);
  // const [immigrationLawExperience, setImmigrationLawExperience] = useState<string>('');
  // const [barNumber, setBarNumber] = useState<string>('');
  // const [startDate, setStartDate] = useState<string>('');
  // const [interestIds, setInterestIds] = useState<string[]>([]);

  const handleInsert = async () => {
    if (!firstName || !lastName) return;
    const newProfile: Profile = {
      // hardcoded values for now
      user_id: crypto.randomUUID() as UUID,
      roles: ['blah'],
      languages: ['blah', 'blah'],
      hours_per_month: 40,
      immigration_law_experience: '5 years',
      bar_number: '12345',
      start_date: new Date().toDateString(),
      interest_ids: [crypto.randomUUID()] as UUID[],
      first_name: firstName,
      last_name: lastName,
      location: 'ur moms house',
      eoir_registered: true,
      availability_description: 'anytime for that D',
    };
    await insertProfile(newProfile);
    setFirstName('');
    setLastName('');
  };

  const ExternalDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  `;

  const InfoForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5 rem; // 40 px
    padding: 3rem; // 52 px = 13/4
    border-radius: 0.625rem;
    border: 2px solid ${COLORS.blueMid};
    width: 39.25rem;
  `;

  /* const Header1 = styled(H1)`
    display: block;
    font-size: 2rem;
    font-size: 3 rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    ${openSans.style}
    color: ${COLORS.greyDarker};
    margin: 0 auto;
    justify-content: center;
    max-width: 500px;
  `;
  */

  const SpacerDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    //justify-content: center;
    //max-width: 400px;
  `;

  const ThirdDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    //justify-content: center;
    // max-width: 400px;

    display: flex;
    flex-direction: column;
    gap: 1.2rem; // 20 px
  `;

  const CenteredDiv = styled(H4)`
    //display: flex;
    //justify-content: center;
    //align-items: center;
    //width: 100vw;
    //height: 100vh;
    color: ${COLORS.greyDark};
    text-align: center;
  `;

  return (
    <InfoForm>
      <H1>Basic Information</H1>
      <SpacerDiv>
        <ThirdDiv>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <TextInput
              label="First Name"
              placeholder="Rahi"
              erroring={false}
              type="firstName"
              name="firstName"
              setValue={setFirstName}
              value={firstName}
              errorText="first name error"
            />
            <TextInput
              label="Last Name"
              placeholder="Hazra"
              erroring={false}
              type="lastName"
              name="lastName"
              setValue={setLastName}
              value={lastName}
              errorText="last name error"
            />
            /
          </div>
          <TextInput
            label="City"
            placeholder="City"
            erroring={false}
            errorText="city error"
          />
          {/* <TextInput
            label="How much time do you have to commit? (hrs/month)"
            placeholder="hrs/month"
            erroring={false}
            type="hoursPerMonth"
            name="hoursPerMonth"
            setValue={sethoursPerMonth}
            value={hoursPerMonth}
            errorText="time commitment error"
          /> */}
        </ThirdDiv>
      </SpacerDiv>
      <SpacerDiv>
        <button type="button" onClick={handleInsert}>
          Submit
        </button>
      </SpacerDiv>
    </InfoForm>
  );
}
