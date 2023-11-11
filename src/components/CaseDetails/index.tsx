/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { timestampStringToDate, parseDate } from '@/utils/helpers';
import { H1 } from '@/styles/text';
import { CaseListing } from '@/types/schema';
import InterestForm from '../InterestForm';
import {
  CaseInterestContainer,
  CaseDisplay,
  InfoContainer,
  Line,
} from './styles';

export default function CaseDetails({ caseData }: { caseData: CaseListing }) {
  return (
    <CaseDisplay>
      <CaseInterestContainer>
        <InfoContainer>
          <H1>Guatemalan mother and two children seeking protection</H1>
          {/* <p>
            <strong>Languages: </strong>
            {caseData.languages}
          </p> */}
          {caseData.upcoming_date && (
            <p>
              <strong>Next Court/Filing Date: </strong>
              {parseDate(timestampStringToDate(caseData.upcoming_date))}
            </p>
          )}

          <p>{caseData.summary}</p>
        </InfoContainer>
        <Line />
        <InterestForm caseData={caseData} />
      </CaseInterestContainer>
    </CaseDisplay>
  );
}
