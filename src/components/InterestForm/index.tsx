'use client';

import { useState, useEffect } from 'react';
import { insertInterest } from '@/api/supabase/queries/interest';
import { Interest, CaseListing, RoleEnum } from '@/types/schema';
import { H4 } from '@/styles/text';
import COLORS from '@/styles/colors';
import Button from '../Button';
import {
  FormContainer,
  FormTextArea,
  FormInput,
  RadioGroup,
  RadioLabel,
  RadioInput,
  FormFooter,
  FormWarning,
  FormTitle,
} from './styles';

const radioOptions = [
  'Attorney',
  'Interpreter',
  'Either Attorney or Interpreter',
];

export default function InterestForm({ caseData }: { caseData: CaseListing }) {
  const [reason, setReason] = useState<string>('');
  const [rolesInterested, setRolesInterested] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  useEffect(() => {
    // Reset form fields when caseData changes
    setReason('');
    setStartDate('');
    setRolesInterested('');
  }, [caseData]);

  const handleInsert = async () => {
    // will improve this in the next sprint
    if (reason !== '' && startDate !== '' && rolesInterested !== '') {
      const newInterest: Interest = {
        // hardcoded values for now
        listing_id: caseData.id,
        listing_type: 'CASE',
        user_id: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
        form_response: {
          rolesInterested:
            rolesInterested === radioOptions[2]
              ? ['ATTORNEY', 'INTERPRETER']
              : [rolesInterested.toUpperCase() as RoleEnum],
          interestReason: reason,
          start_date: new Date(startDate),
        },
      };

      await insertInterest(newInterest);
      setReason('');
      setStartDate('');
      setRolesInterested('');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Submit Interest</FormTitle>
      <H4>What role(s) are you applying for?</H4>
      <RadioGroup>
        {radioOptions.map(option => (
          <RadioLabel key={option}>
            <RadioInput
              id="radio"
              type="radio"
              name="radioOptions"
              value={option}
              checked={rolesInterested === option}
              onChange={event => setRolesInterested(event.target.value)}
            />
            {option}
          </RadioLabel>
        ))}
      </RadioGroup>

      <H4>What is the earliest date you can contact the client?</H4>
      <FormInput
        id="startDate"
        required
        placeholder="MM/DD/YYYY"
        value={startDate}
        onChange={event => setStartDate(event.target.value)}
      />

      <H4>Why are you interested in this case?</H4>
      <FormTextArea
        id="reason"
        required
        value={reason}
        onChange={event => setReason(event.target.value)}
      />
      <FormFooter>
        <FormWarning>
          Your interest form is not saved!
          <br />
          Please submit before leaving this page.
        </FormWarning>
        <Button
          primaryColor={COLORS.blueMid}
          secondaryColor={COLORS.blueDark}
          onClick={handleInsert}
        >
          Submit Interest
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
