'use client';

import { useEffect, useState } from 'react';
import { upsertInterest } from '@/api/supabase/queries/interest';
import RadioGroup from '@/components/RadioGroup';
import TextAreaInput from '@/components/TextAreaInput';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H3, P } from '@/styles/text';
import { Interest, Listing } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { isValidDate } from '@/utils/helpers';
import { Button } from '../Buttons';
import DateInput from '../DateInput';
import * as Styles from './styles';

interface Responses {
  start_date?: Date;
  needs_interpreter?: boolean;
  interest_reason: string;
}

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
    // Error handling, check if required fields are unfilled.
    if (
      // CASE listing requires: startDate and needsInterpreter
      (listingData.listing_type === 'CASE' &&
        !interpretation &&
        (startDate === '' ||
          !isValidDate(startDate) ||
          needsInterpreter === '')) ||
      // CASE_INT and INT listings require: startDate
      (((listingData.listing_type === 'CASE' && interpretation) ||
        listingData.listing_type === 'INT') &&
        (startDate === '' || !isValidDate(startDate))) ||
      // LCA and DOC listings require: reason
      ((listingData.listing_type === 'LCA' ||
        listingData.listing_type === 'DOC') &&
        reason === '')
    ) {
      setMissingInfo(true);
      return;
    }
    // submit interest form with fields according to listing_type
    // CASE_INT, INT: startDate, reason
    // CASE: startDate, needs_interpreter reason
    // LCA, DOC interest: reason
    const responses: Responses = { interest_reason: '' };
    if (auth && auth.userId) {
      if (
        listingData.listing_type === 'CASE' ||
        listingData.listing_type === 'INT'
      ) {
        // CASE_INT, INT, CASE include startDate
        responses.start_date = new Date(startDate);
        // CASE also includes needs_interpreter
        if (listingData.listing_type === 'CASE' && !interpretation) {
          responses.needs_interpreter = needsInterpreter === 'Yes';
        }
      }
      // all listings have interest_reason
      responses.interest_reason = reason;
      const newInterest: Interest = {
        listing_id: listingData.id,
        listing_type:
          listingData.listing_type === 'CASE' && interpretation
            ? 'CASE_INT'
            : listingData.listing_type,
        user_id: auth.userId,
        form_response: responses,
      };
      await upsertInterest(newInterest);
    }

    setReason('');
    setStartDate('');
    setNeedsInterpreter('');
    setSubmitted(true);
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
    <Styles.FormContainer>
      <H3>Submit Interest</H3>
      {submitted ? (
        <Styles.EmptySpace>
          <P>Your submission has been received!</P>
        </Styles.EmptySpace>
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
              listingData.listing_type === 'CASE' ? 'case' : 'opportunity'
            }?`}
            required={
              listingData.listing_type === 'DOC' ||
              listingData.listing_type === 'LCA'
            }
            placeholder={`I want to work on this ${
              listingData.listing_type === 'CASE' ? 'case' : 'opportunity'
            } because...`}
            error={
              missingInfo &&
              (listingData.listing_type === 'LCA' ||
                listingData.listing_type === 'DOC')
                ? 'Must include a reason'
                : ''
            }
            id="reason"
            value={reason}
            setValue={setReason}
          />
          <Styles.FormFooter>
            <Styles.FormWarning>
              Your interest form is not saved!
              <br />
              Please submit before leaving this page.
            </Styles.FormWarning>
            <Button
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              onClick={handleInsert}
            >
              Submit Interest
            </Button>
          </Styles.FormFooter>
        </Flex>
      )}
    </Styles.FormContainer>
  );
}
