'use client';

import { useState, useEffect } from 'react';
import { UUID } from 'crypto';
import { insertInterest } from '../../api/supabase/queries/interest';
import { Interest, CaseListing } from '../../types/schema';
import { Button } from '../Button';
import {
  FormContainer,
  FormTextArea,
  FormInput,
  RadioGroup,
  RadioLabel,
  RadioInput,
  FormFooter,
  FormWarning,
} from './styles';

const radioOptions = ['Attorney', 'Interpreter', 'Both Attorney & Interpreter'];

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
    if (reason !== '') {
      const newInterest: Interest = {
        // hardcoded values for now
        id: crypto.randomUUID() as UUID,
        listing_id: caseData.id,
        listing_type: 1,
        user_id: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
        form_response: {
          interestType: rolesInterested,
          interestReason: reason,
          start_date: startDate,
        },
      };

      await insertInterest(newInterest);
      setReason('');
    }
  };

  return (
    <FormContainer>
      <strong>Submit Interest</strong>
      <p>What role(s) are you applying for?</p>
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

      <p>What is the earliest date you are willing to contact the client?</p>
      <FormInput
        id="startDate"
        required
        placeholder="MM/DD/YYYY"
        value={startDate}
        onChange={event => setStartDate(event.target.value)}
      />

      <p>Why are you interested in this case?</p>
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
        <Button onClick={handleInsert}>Submit Interest</Button>
      </FormFooter>
    </FormContainer>
  );
}
