'use client';

import { useState, useEffect, useContext } from 'react';
import { upsertInterest } from '@/api/supabase/queries/interest';
import { Interest, Listing} from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { isValidDate } from '@/utils/helpers';
import { P, H3 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import RadioGroup from '@/components/RadioGroup';
import DateInput from '../DateInput';
import Button from '../Button';
import {
  FormContainer,
  FormTextArea,
  FormQuestion,
  // RadioGroup as RG,
  // Radio,
  // RadioInput,
  // RadioLabel,
  // ErrorText,
  FormFooter,
  FormWarning,
} from './styles';

const formQuestion = (label: string, required = false) => {
  <Flex $direction="row">
    <FormQuestion>{label}</FormQuestion>
    {required ? (
      <FormQuestion $color={COLORS.redMid}> *</FormQuestion>
    ) : (
      <FormQuestion> (optional)</FormQuestion>
    )}
  </Flex>;
};

// need to pass interpretation on ListingDetails
export default function InterestForm({
  listingData,
  interpretation = false,
}: {
  listingData: Listing;
  interpretation?: boolean;
}) {
  const auth = useAuth();  
  const [reason, setReason] = useState<string>('');
  const [needsInterpreter, setNeedsInterpreter] = useState<string>(''); // useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [missingInfo, setMissingInfo] = useState(false);

  useEffect(() => {
    // Reset form fields when caseData changes
    setReason('');
    setNeedsInterpreter('');
    setStartDate('');
    setSubmitted(false);
    setMissingInfo(false);
  }, [listingData]);

  const handleInsert = async () => {
    // Error handling
    if (startDate === '' || needsInterpreter === '') {
      setMissingInfo(true);
      return;
    }
    let responses = {};
    if (isValidDate(startDate)) {
      if (auth && auth.userId) {
        if (
          listingData.listing_type === 'CASE' ||
          listingData.listing_type === 'INT'
        ) {
          responses = { ...responses, start_date: new Date(startDate) };
          if (listingData.listing_type === 'CASE' && !interpretation) {
            responses = {
              ...responses,
              needs_interpreter: needsInterpreter === 'Yes',
            };
          }
        }
        responses = { ...responses, interest_reason: reason };
        const newInterest: Interest = {
          listing_id: listingData.id,
          listing_type: listingData.listing_type,
          user_id: auth.userId,
          form_response: {
            ...responses,
          },
        };
        await upsertInterest(newInterest);
      }

      setReason('');
      setStartDate('');
      setNeedsInterpreter('');
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
        <P>Your submission has been received!</P>
      ) : (
        <>
          {(listingData.listing_type === 'CASE' ||
            listingData.listing_type === 'INT') && (
            <DateInput
              label="What is the earliest date you can contact the client?"
              required
              error={getErrorText()}
              name="startDate"
              value={startDate}
              setValue={setStartDate}
            />
          )}
          {formQuestion(
            'Do you need language interpretation help for the client?',
            true,
          )}
          <RadioGroup
            name="reason"
            value={needsInterpreter}
            setValue={setNeedsInterpreter}
            options={['Yes', 'No']}
            label="Do you need language interpretation help for the client? *"
            error={
              missingInfo ? 'Must select whether you need language support' : ''
            }
          />
          {/* <RG>
            {radioOptions.map(option => (
              <Radio key={option}>
                <RadioInput
                  id={`radio${option}`}
                  type="radio"
                  name="radioOptions"
                  value={option}
                  // checked={rolesInterested === option}
                  onChange={event => event.target.value}
                />
                <RadioLabel htmlFor={`radio${option}`}>{option}</RadioLabel>
              </Radio>
            ))}
            {missingInfo && (
              <ErrorText>
                Must select whether you need language support
              </ErrorText>
            )}
          </RG> */}
          {formQuestion(
            'Why are you interested in this case?',
            listingData.listing_type === 'LCA' ||
              listingData.listing_type === 'DOC',
          )}
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
