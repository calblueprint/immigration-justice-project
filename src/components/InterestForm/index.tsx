'use client';

import { useState } from 'react';
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
} from './styles';

const radioOptions = ['Attorney', 'Interpreter', 'Both Interpreter & Attorney'];

export default function InterestForm({ caseData }: { caseData: CaseListing }) {
  const [reason, setReason] = useState<string>('');
  const [rolesInterested, setRolesInterested] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

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
    } else {
      // console.log('cannot create an empty interest');
    }
  };

  return (
    <FormContainer>
      {/* <input type="text" /> */}
      <strong>Submit Interest</strong>
      <div>What role(s) are you applying for?</div>
      <RadioGroup>
        {radioOptions.map(option => (
          <RadioLabel key={option}>
            <RadioInput
              id="radio"
              type="radio"
              name="radioOptions"
              value={option}
              checked={rolesInterested === option}
              onClick={() => setRolesInterested(option)}
            />
            {option}
          </RadioLabel>
        ))}
      </RadioGroup>

      <p>What is the earliest date you are willing to contact the client?</p>
      <FormInput
        id="startDate"
        placeholder="mm/dd/yyyy"
        onChange={event => setStartDate(event.target.value)}
      />

      <p>Why are you interested in this case?</p>
      <FormTextArea
        id="reason"
        required
        value={reason}
        onChange={event => setReason(event.target.value)}
      />
      <Button onClick={handleInsert}>Submit Interest</Button>
    </FormContainer>
  );
}
