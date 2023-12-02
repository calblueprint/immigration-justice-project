/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  timestampStringToDate,
  parseDate,
  parseAgency,
  parseExperience,
  parseRolesNeeded,
  parseTimeCommitment,
} from '@/utils/helpers';
import { H2, P, StrongP } from '@/styles/text';
import { CaseListing } from '@/types/schema';
import InterestForm from '../InterestForm';
import {
  CaseInterestContainer,
  CaseDisplay,
  InfoContainer,
  Line,
  FieldContainer,
  InnerFieldContainer,
} from './styles';

const renderField = (label: string, value: string | boolean) => (
  <FieldContainer>
    <P>{label}</P>
    <StrongP>{value}</StrongP>
  </FieldContainer>
);

// CLEANER IMPLEMENTATION
const caseFields = [
  {
    label: 'Needs',
    getValue: (data: CaseListing) =>
      parseRolesNeeded(false, data.needs_attorney, data.needs_interpreter),
  },
  {
    label: 'Adjudicating Agency',
    getValue: (data: CaseListing) =>
      parseAgency(data.adjudicating_agency) || 'N/A',
  },
  {
    label: 'Time Commitment',
    getValue: (data: CaseListing) =>
      parseTimeCommitment(data.hours_per_month, data.num_months),
  },
  {
    label: 'Remote/In Person',
    getValue: (data: CaseListing) => (data.is_remote ? 'Remote' : 'In Person'),
  },
  {
    label: 'Client Country of Origin',
    getValue: (data: CaseListing) => data.country || 'N/A',
  },
  {
    // Temporary
    label: 'Custody Location',
    getValue: () => 'San Diego, CA',
  },
  {
    label: 'Client Location',
    getValue: (data: CaseListing) => data.client_location || 'N/A',
  },
  {
    label: 'Client Language',
    getValue: (data: CaseListing) => data.languages.join(', '),
  },
  {
    label: 'Attorney Experience Level',
    getValue: (data: CaseListing) =>
      parseExperience(data.experience_needed) || 'N/A',
  },
  {
    label: 'Relief Sought',
    getValue: (data: CaseListing) => data.relief_codes.join(', ') || 'N/A',
  },
  {
    label: 'Next Court/Filing Date',
    getValue: (data: CaseListing) =>
      data.upcoming_date
        ? parseDate(timestampStringToDate(data.upcoming_date))
        : 'N/A',
  },
];

export default function CaseDetails({ caseData }: { caseData: CaseListing }) {
  return (
    <CaseDisplay>
      <CaseInterestContainer>
        <InfoContainer>
          <H2>{caseData.title || 'Migrant seeking representation'}</H2>
          <InnerFieldContainer>
            {caseFields.map(({ label, getValue }) => (
              <div key={label}>{renderField(label, getValue(caseData))}</div>
            ))}
          </InnerFieldContainer>
          <P>{caseData.summary || 'No summary Found'}</P>
        </InfoContainer>
        <Line />
        <InterestForm caseData={caseData} />
      </CaseInterestContainer>
    </CaseDisplay>
  );
}
