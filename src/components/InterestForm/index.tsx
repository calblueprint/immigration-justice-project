'use client';

import { useState, useEffect } from 'react';
import { upsertInterest } from '@/api/supabase/queries/interest';
import { Interest, Listing } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { isValidDate } from '@/utils/helpers';
import { P, H3 } from '@/styles/text';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import RadioGroup from '@/components/RadioGroup';
import TextAreaInput from '@/components/TextAreaInput';
import DateInput from '@/components/DateInput';
import Button from '@/components/Button';
import { FormContainer, FormFooter, FormWarning } from './styles';

export default function InterestForm({
  listingData,
  interpretation = false,
}: {
  listingData: Listing;
  interpretation?: boolean;
}) {
  const auth = useAuth();
  const [reason, setReason] = useState<string>('');
  const [needsInterpreter, setNeedsInterpreter] = useState<string>('');
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
    if (
      (listingData.listing_type === 'CASE' &&
        !interpretation &&
        (startDate === '' || needsInterpreter === '')) ||
      (((listingData.listing_type === 'CASE' && interpretation) ||
        listingData.listing_type === 'INT') &&
        startDate === '') ||
      ((listingData.listing_type === 'LCA' ||
        listingData.listing_type === 'DOC') &&
        reason === '')
    ) {
      setMissingInfo(true);
      return;
    }
    let responses = {};
    if (
      isValidDate(startDate) ||
      listingData.listing_type === 'DOC' ||
      listingData.listing_type === 'LCA'
    ) {
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
          listing_type:
            listingData.listing_type === 'CASE' && interpretation
              ? 'CASE_INT'
              : listingData.listing_type,
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
        <Flex $gap="30px" $direction="column">
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
          {listingData.listing_type === 'CASE' && !interpretation && (
            <RadioGroup
              name="reason"
              required
              value={needsInterpreter}
              setValue={setNeedsInterpreter}
              options={['Yes', 'No']}
              label="Will you require language interpretation assistance to represent this client?"
              error={
                missingInfo
                  ? 'Must select whether you need language interpretation assistance'
                  : ''
              }
            />
          )}
          <TextAreaInput
            label={`Why are you interested in this ${
              listingData.listing_type === 'CASE' ? 'case' : 'assignment'
            }?`}
            required
            placeholder={`I want to work on this ${
              listingData.listing_type === 'CASE' ? 'case' : 'assignment'
            } because...`}
            error={missingInfo && reason === '' ? 'Must include a reason' : ''}
            id="reason"
            value={reason}
            setValue={setReason}
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
        </Flex>
      )}
    </FormContainer>
  );
}
