'use client';

import { useState, useEffect } from 'react';
import { upsertInterest } from '@/api/supabase/queries/interest';
import { Interest, CaseListing, RoleEnum } from '@/types/schema';
import { H4, P } from '@/styles/text';
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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Reset form fields when caseData changes
    setReason('');
    setStartDate('');
    setRolesInterested('');
    setSubmitted(false);
  }, [caseData]);

  const handleInsert = async () => {
    // will improve this in the next sprint
    if (reason !== '' && startDate !== '' && rolesInterested !== '') {
      const newInterest: Interest = {
        // hardcoded values for now
        listing_id: caseData.id,
        listing_type: 'CASE',
        user_id: '515d9b33-9185-4601-9a13-23789bea3ac0',
        form_response: {
          start_date: new Date(startDate),
          interestReason: reason,
          rolesInterested:
            rolesInterested === radioOptions[2]
              ? ['ATTORNEY', 'INTERPRETER']
              : [rolesInterested.toUpperCase() as RoleEnum],
        },
      };

      await upsertInterest(newInterest);
      setReason('');
      setStartDate('');
      setRolesInterested('');
      setSubmitted(true);
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
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          onClick={handleInsert}
        >
          Submit Interest
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
