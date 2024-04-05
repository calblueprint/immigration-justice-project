/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useMemo } from 'react';
import {
  formatTimestamp,
  parseAgency,
  parseTimeCommitment,
} from '@/utils/helpers';
import { H2, H3, H4, P, StrongP } from '@/styles/text';
import {
  CaseListing,
  DocumentTranslation,
  Interpretation,
  LimitedCaseAssignment,
  Listing,
} from '@/types/schema';import { useProfile } from '@/utils/ProfileProvider';
import { useAuth } from '@/utils/AuthProvider';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import logo from '@/lib/dohs_logo.webp';
import InterestForm from '../InterestForm';
import { LinkButton } from '../Button';
import Icon from '../Icon';
import {
  CaseDisplay,
  InfoContainer,
  FieldContainer,
  InnerFieldContainer,
  AuthButtons,
  IconTextGroup,
  BorderedSection,
  DateText,
} from './styles';

const renderField = (label: string, value: string | boolean | number) => (
  <FieldContainer>
    <StrongP>{label}</StrongP>
    <P>{value}</P>
  </FieldContainer>
);

const caseFields = [
  // Relief sought
  {
    label: 'Relief Sought',
    getValue: (data: Listing) =>
      (data as CaseListing).relief_codes.join(', ') || 'N/A',
  },
  // Time Commitment
  {
    label: 'Time Commitment',
    getValue: (data: Listing) =>
      parseTimeCommitment(
        (data as CaseListing).hours_per_week,
        (data as CaseListing).num_weeks,
      ),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: Listing) =>
      (data as CaseListing).is_remote ? 'Remote' : 'In Person',
  },
  // Adjudicating Agency
  {
    label: 'Adjudicating Agency',
    getValue: (data: Listing) => {
      const d = data as CaseListing;
      return d.adjudicating_agency ? parseAgency(d.adjudicating_agency) : 'N/A';
      // (data as CaseListing).adjudicating_agency ? parseAgency(data.adjudicating_agency) : 'N/A',
    },
  },
  // Client Languages
  {
    label: 'Client Language(s)',
    getValue: (data: Listing) => (data as CaseListing).languages.join(', '),
  },
  // Client Country of Origin
  {
    label: 'Client Country of Origin',
    getValue: (data: Listing) => (data as CaseListing).country || 'N/A',
  },
  // Client vs. Custody Location handled in Component
];

const caseInterpretationFields = [
  // Languages
  {
    label: 'Language(s)',
    getValue: (data: Listing) => (data as CaseListing).languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'One-Time Intepretation',
  },
  // Time Commitment
  {
    label: 'Time Commitment',
    getValue: (data: Listing) =>
      parseTimeCommitment(
        (data as CaseListing).hours_per_week,
        (data as CaseListing).num_weeks,
      ),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: Listing) =>
      (data as CaseListing).is_remote ? 'Remote' : 'In Person',
  },
];

const intepretationFields = [
  // Languages
  {
    label: 'Language(s)',
    getValue: (data: Listing) => (data as Interpretation).languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'One-Time Intepretation',
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: (data: Listing) =>
      (data as Interpretation).is_remote ? 'Remote' : 'In Person',
  },
];

const docFields = [
  // Languages
  {
    label: 'Language(s)',
    getValue: (data: Listing) =>
      (data as DocumentTranslation).languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'Document Translation', // check if this crashes
  },
  // Number of Pages
  {
    label: 'Number of Pages',
    getValue: (data: Listing) => (data as DocumentTranslation).num_pages,
  },
];

const LCAFields = [
  // Country Field
  {
    label: 'Country Field',
    getValue: (data: Listing) => (data as LimitedCaseAssignment).country,
  },
  // Language(s)
  {
    label: 'Language(s)',
    getValue: (data: Listing) =>
      (data as LimitedCaseAssignment).languages.join(', '),
  },
  // Expected Deliverable
  {
    label: 'Expected Deliverable',
    getValue: (data: Listing) => (data as LimitedCaseAssignment).deliverable,
  },
];

export default function ListingDetails({
  listingData,
  interpretation = false,
}: {
  listingData: Listing;
  interpretation?: boolean;
}) {
  const auth = useAuth();
  const profile = useProfile();  
  
  const listingFields = useMemo(() => {
    if (listingData.listing_type === 'CASE') {
      if (interpretation && listingData.needs_interpreter) {
        return caseInterpretationFields;
      }
      // will we ever need to render the case listing (instead of case interp) for a case that has needs_interpreter === true?
      if (listingData.is_detained) {
        return [
          ...caseFields,
          {
            label: 'Custody Location',
            getValue: (data: Listing) =>
              (data as CaseListing).client_location || 'N/A',
          },
        ];
      }
      return [
        ...caseFields,
        {
          label: 'Client Location',
          getValue: (data: Listing) =>
            (data as CaseListing).client_location || 'N/A',
        },
      ];
    }
    if (listingData.listing_type === 'INT') {
      return intepretationFields;
    }
    if (listingData.listing_type === 'DOC') {
      return docFields;
    }
    return LCAFields;
  }, [listingData, interpretation]);

  const dateComponent = () => {
    if (listingData.listing_type !== 'INT') {
      let dateHeader = 'Assignment Deadline';
      let dateData = '';
      if (listingData.listing_type === 'CASE') {
        dateHeader = 'Next Court/Filing Date';
        dateData = formatTimestamp(listingData.upcoming_date); // listingData.upcoming_date ? formatTimestamp(listingData.upcoming_date) : "N/A"
      } else {
        dateData = formatTimestamp(listingData.deadline);
      }
      return (
        <IconTextGroup>
          <Icon type="calendar" />
          <DateText $bold>
            {dateHeader}: <DateText> {dateData}</DateText>
          </DateText>
        </IconTextGroup>
      );
    }
    return null;
  };
  
  const Interest = useMemo(() => {
    if (auth && auth.userId) {
      return profile?.profileData ? (
        <InterestForm caseData={listingData as CaseListing} />
      ) : (
        // <H3>Updated Interest Form Coming Soon!</H3> // remove after refactoring InterestForm
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
      <InfoContainer>
        <BorderedSection>
          {dateComponent()}
          <Flex $align="center" $gap="18px" $direction="row">
            <img src={logo.src} alt="DOHS Logo" width="77" height="77" />
            <H2>{listingData.title || 'Migrant seeking representation'}</H2>
          </Flex>
        </BorderedSection>
        <BorderedSection>
          <IconTextGroup>
            <Icon type="tag" />
            <H4>
              {listingData.listing_type === 'LCA' ? 'Assignment' : 'Case'}{' '}
              Highlights
            </H4>
          </IconTextGroup>
          <InnerFieldContainer>
            {listingFields.map(({ label, getValue }) => (
              <div key={label}>{renderField(label, getValue(listingData))}</div>
            ))}
          </InnerFieldContainer>
        </BorderedSection>
        {listingData.listing_type === 'LCA' && (
          <BorderedSection>
            <IconTextGroup>
              <Icon type="tag" />
              <H4>Research Topic(s)</H4>
            </IconTextGroup>
            <P>
              {listingData.research_topic
                ? listingData.research_topic
                : 'Not Available'}
            </P>
          </BorderedSection>
        )}
        <BorderedSection>
          <IconTextGroup>
            <Icon type="briefcase" />
            <H4>
              {listingData.listing_type === 'LCA'
                ? 'Assignment Description'
                : 'Case Description'}
            </H4>
          </IconTextGroup>
          <P>{listingData.summary ? listingData.summary : 'Not Available'}</P>
        </BorderedSection>
      </InfoContainer>
      <BorderedSection>{Interest}</BorderedSection>
    </CaseDisplay>
  );
}
