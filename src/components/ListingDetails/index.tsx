/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useMemo } from 'react';
import {
  timestampStringToDate,
  parseDate,
  parseAgency,
  parseTimeCommitment,
} from '@/utils/helpers';
import { H2, H3, P, StrongP } from '@/styles/text';
import { CaseListing, DocumentTranslation, Interpretation, LimitedCaseAssignment, Listing } from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';
import { useAuth } from '@/utils/AuthProvider';
import COLORS from '@/styles/colors';
import InterestForm from '../InterestForm';
import { LinkButton } from '../Button';
import {
  CaseInterestContainer,
  CaseDisplay,
  InfoContainer,
  Line,
  FieldContainer,
  InnerFieldContainer,
  AuthButtons,
} from './styles';

const renderField = (label: string, value: string | boolean | number) => (
  <FieldContainer>
    <P>{label}</P>
    <StrongP>{value}</StrongP>
  </FieldContainer>
);

function listingFields(listing: Listing) {
  if (listing.listing_type === "CASE") {
    if (listing.needs_interpreter) { 
      return caseInterpretationFields; 
    }
    // will we ever need to render the case listing (instead of case interp) for a case that has needs_interpreter === true? 
    return caseFields; 
  }
  if (listing.listing_type === "INT") {
    return intepretationFields; 
  }
  if (listing.listing_type === "DOC") {
    return docFields; 
  }
  return LCAFields; 
}

const caseFields = [
  // Relief sought
  {
    label: 'Relief Sought',
    getValue: (data: CaseListing) => data.relief_codes.join(', ') || 'N/A',
  },
  // Time Commitment
  {
    label: 'Time Commitment',
    getValue: (data: CaseListing) =>
      parseTimeCommitment(data.hours_per_week, data.num_weeks),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: CaseListing) => (data.is_remote ? 'Remote' : 'In Person'),
  },
  // Adjudicating Agency
  {
    label: 'Adjudicating Agency',
    getValue: (data: CaseListing) =>
      data.adjudicating_agency ? parseAgency(data.adjudicating_agency) : 'N/A',
  },
  // Client Languages
  {
    label: 'Client Language(s)',
    getValue: (data: CaseListing) => data.languages.join(', '),
  },
  // Client Country of Origin
  {
    label: 'Client Country of Origin',
    getValue: (data: CaseListing) => data.country || 'N/A',
  },
  // Client Location
  {
    label: 'Client Location',
    getValue: (data: CaseListing) => data.client_location || 'N/A',
  },
  // Custody Location
  {
    // Temporary
    label: 'Custody Location',
    getValue: () => 'San Diego, CA',
  }
  // {
  //   label: 'Next Court/Filing Date',
  //   getValue: (data: CaseListing) =>
  //     data.upcoming_date
  //       ? parseDate(timestampStringToDate(data.upcoming_date))
  //       : 'N/A',
  // },
];

const caseInterpretationFields = [
  // Time Commitment 
  {
    label: 'Time Commitment',
    getValue: (data: CaseListing) =>
      parseTimeCommitment(data.hours_per_week, data.num_weeks),
  },
  // Languages
  {
    label: 'Language(s)',
    getValue: (data: CaseListing) => data.languages.join(', '),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: CaseListing) => (data.is_remote ? 'Remote' : 'In Person'),
  },
]

const intepretationFields= [
  // Languages
  {
    label: 'Language(s)',
    getValue: (data: Interpretation) => data.languages.join(', '),
  },
  // Interpretation Type
  {
    label: 'Interpretation Type', // 'Language Support Type' for consistency w/ Doc? 
    getValue: (data: Interpretation) => "One-Time Intepretation",
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: Interpretation) => (data.is_remote ? 'Remote' : 'In Person'),
  }
]

const docFields = [
  // Languages 
  {
    label: 'Language(s)',
    getValue: (data: Listing) => (data as DocumentTranslation).languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type', 
    getValue: (data: Listing) => "Written",
  },
  // Number of Pages 
  {
    label: 'Number of Pages',
    getValue: (data: Listing) => (data as DocumentTranslation).num_pages,
  }
]

const LCAFields = [
  // Country Field
  {
    label: 'Country Field',
    getValue: (data: LimitedCaseAssignment) => data.country,
  },
  // Language(s)
  {
    label: 'Language(s)',
    getValue: (data: LimitedCaseAssignment) => data.languages.join(', '),
  },
  // Expected Deliverable
  {
    label: 'Expected Deliverable',
    getValue: (data: LimitedCaseAssignment) => data.deliverable,
  }
]

export default function CaseDetails({ listingData }: { listingData: Listing }) {
    const auth = useAuth();
    const profile = useProfile();
  
    const Interest = useMemo(() => {
      if (auth && auth.userId) {
        return profile?.profileData ? (
          <InterestForm caseData={listingData as CaseListing} />
      ) : (
        <>
          <H3>
            Please finish submitting your profile before submitting interest.
          </H3>
          <AuthButtons>
            <LinkButton
              $primaryColor={COLORS.blueMid}
              $secondaryColor={COLORS.blueDark}
              href="/onboarding/roles"
            >
              Go to Onboarding
            </LinkButton>
          </AuthButtons>
        </>
      );
    }
    return (
      <>
        <H3>
          You aren&apos;t signed in. In order to submit your interest, log into
          your account, or create a new account.
        </H3>
        <AuthButtons>
          <LinkButton $secondaryColor={COLORS.blueMid} href="/signup">
            Sign Up
          </LinkButton>

          <LinkButton
            $primaryColor={COLORS.blueMid}
            $secondaryColor={COLORS.blueDark}
            href="/login"
          >
            Log In
          </LinkButton>
        </AuthButtons>
      </>
    );
  }, [auth, listingData, profile]);

  return (
    <CaseDisplay>
      <CaseInterestContainer>
        <InfoContainer>
          <H2>{listingData.title || 'Migrant seeking representation'}</H2>
          <InnerFieldContainer>
            {listingFields(listingData).map(({ label, getValue }) => (
              <div key={label}>{renderField(label, getValue(listingData))}</div>
            ))}
          </InnerFieldContainer>
          <P>{listingData.summary || 'No summary Found'}</P>
        </InfoContainer>
        <Line />
        {Interest}
      </CaseInterestContainer>
    </CaseDisplay>
  );
}
