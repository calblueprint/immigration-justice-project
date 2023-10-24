/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  CaseInterestContainer,
  CaseDisplay,
  InfoContainer,
  Line,
} from './styles';
import { H1 } from '../../styles/text';
import { CaseListing } from '../../types/schema';
import InterestForm from '../InterestForm';

export default function CaseDetails({ caseData }: { caseData: CaseListing }) {
  return (
    <CaseDisplay>
      <CaseInterestContainer>
        <InfoContainer>
          <H1>Guatemalan mother and two children seeking protection</H1>
          <p>
            <strong>Languages: </strong>
            {caseData.languages}
          </p>
          <p>
            <strong>Next Court/Filing Date:</strong>
            {caseData.upcoming_date}
          </p>

          <p>{caseData.summary}</p>
        </InfoContainer>
        <Line />
        <InterestForm caseData={caseData} />
      </CaseInterestContainer>
    </CaseDisplay>
  );
}
