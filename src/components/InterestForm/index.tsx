'use client';

import { useState, useEffect, useContext } from 'react';
import { upsertInterest } from '@/api/supabase/queries/interest';
import { Interest, CaseListing } from '@/types/schema';
import { ProfileContext } from '@/utils/ProfileProvider';
import { isValidDate } from '@/utils/helpers';
import { P, H3 } from '@/styles/text';
import COLORS from '@/styles/colors';
import DateInput from '../DateInput';
import Button from '../Button';
import {
  FormContainer,
  FormTextArea,
  FormQuestion,
  RadioGroup,
  Radio,
  RadioInput,
  FormFooter,
  FormWarning,
  ErrorText,
  RadioLabel,
} from './styles';

const radioOptions = [
  'Attorney',
  'Interpreter',
  'Either Attorney or Interpreter',
];

export default function InterestForm({ caseData }: { caseData: CaseListing }) {
  const auth = useAuth();
  const profile = useProfile();
  const [reason, setReason] = useState<string>('');
  const [rolesInterested, setRolesInterested] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [missingInfo, setMissingInfo] = useState(false);

  useEffect(() => {
    // Reset form fields when caseData changes
    setReason('');
    setStartDate('');
    setRolesInterested('');
    setSubmitted(false);
    setMissingInfo(false);
  }, [caseData]);

  const handleInsert = async () => {
    if (startDate === '' || rolesInterested === '') {
      setMissingInfo(true);
      return;
    }
    if (isValidDate(startDate)) {
      if (auth && auth.userId && profile) {
        const newInterest: Interest = {
          listing_id: caseData.id,
          listing_type: 'CASE',
          user_id: auth.userId,
          form_response: {
            start_date: new Date(startDate),
            interest_reason: reason,
            // TODO: add needs_interpreter field
          },
        };
        await upsertInterest(newInterest);
      }

      setReason('');
      setStartDate('');
      setRolesInterested('');
      setSubmitted(true);
    }
  };

  const getErrorText = () => {
    if (startDate === '' && missingInfo) {
      return 'Must include earliest contact date';
    }
    if (startDate !== '' && !isValidDate(startDate)) {
      return 'Must select a current or future date';
    }
    return '';
  };

  return (
    <FormContainer>
      <H3>Submit Interest</H3>
      {submitted ? (
        <P>We have received your submission!</P>
      ) : (
        <>
          <FormQuestion $color={COLORS.greyDark}>
            What role(s) are you applying for?
          </FormQuestion>
          <RadioGroup>
            {radioOptions.map(option => (
              <Radio key={option}>
                <RadioInput
                  id={`radio${option}`}
                  type="radio"
                  name="radioOptions"
                  value={option}
                  checked={rolesInterested === option}
                  onChange={event => setRolesInterested(event.target.value)}
                />
                <RadioLabel htmlFor={`radio${option}`}>{option}</RadioLabel>
              </Radio>
            ))}
            {missingInfo && rolesInterested === '' && (
              <ErrorText>Must select your preferred role</ErrorText>
            )}
          </RadioGroup>
          <DateInput
            label="What is the earliest date you can contact the client?"
            error={getErrorText()}
            name="startDate"
            value={startDate}
            setValue={setStartDate}
          />
          <FormQuestion $color={COLORS.greyDark}>
            Why are you interested in this case?
          </FormQuestion>
          <FormTextArea
            id="reason"
            placeholder="I want to work on this case because..."
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
        </>
      )}
    </FormContainer>
  );
}
