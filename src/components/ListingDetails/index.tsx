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

interface ListingField<T extends Listing> {
  label: string;
  getValue: (data: T) => string;
}

const caseFields: ListingField<CaseListing>[] = [
  // Relief sought
  {
    label: 'Relief Sought',
    getValue: data => data.relief_codes.join(', ') || 'N/A',
  },
  // Time Commitment
  {
    label: 'Time Commitment',
    getValue: data => parseTimeCommitment(data.hours_per_week, data.num_weeks),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: data => (data.is_remote ? 'Remote' : 'In Person'),
  },
  // Adjudicating Agency
  {
    label: 'Adjudicating Agency',
    getValue: data =>
      data.adjudicating_agency ? parseAgency(data.adjudicating_agency) : 'N/A',
  },
  // Client Languages
  {
    label: 'Client Language(s)',
    getValue: data => data.languages.join(', '),
  },
  // Client Country of Origin
  {
    label: 'Client Country of Origin',
    getValue: data => data.country || 'N/A',
  },
  // Client vs. Custody Location handled in Component
];

const caseInterpretationFields: ListingField<CaseListing>[] = [
  // Languages
  {
    label: 'Language(s)',
    getValue: data => data.languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'One-Time Intepretation',
  },
  // Time Commitment
  {
    label: 'Time Commitment',
    getValue: data => parseTimeCommitment(data.hours_per_week, data.num_weeks),
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: data => (data.is_remote ? 'Remote' : 'In Person'),
  },
];

const intepretationFields: ListingField<Interpretation>[] = [
  // Languages
  {
    label: 'Language(s)',
    getValue: data => data.languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'One-Time Intepretation',
  },
  // Remote/In Person
  {
    label: 'Remote/In Person',
    getValue: data => (data.is_remote ? 'Remote' : 'In Person'),
  },
];

const docFields: ListingField<DocumentTranslation>[] = [
  // Languages
  {
    label: 'Language(s)',
    getValue: data => data.languages.join(', '),
  },
  // Language Support Type
  {
    label: 'Language Support Type',
    getValue: () => 'Document Translation',
  },
  // Number of Pages
  {
    label: 'Number of Pages',
    getValue: data => data.num_pages.toString(),
  },
];

const lcaFields: ListingField<LimitedCaseAssignment>[] = [
  // Country Field
  {
    label: 'Country Field',
    getValue: data => data.country,
  },
  // Language(s)
  {
    label: 'Language(s)',
    getValue: data => data.languages.join(', '),
  },
  // Expected Deliverable
  {
    label: 'Expected Deliverable',
    getValue: data => data.deliverable,
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
    let fields: ListingField<any>[];
    if (listingData.listing_type === 'CASE') {
      if (interpretation && listingData.needs_interpreter) {
        fields = caseInterpretationFields;
      } else if (listingData.is_detained) {
        fields = [
          ...caseFields,
          {
            label: 'Custody Location',
            getValue: data => data.client_location || 'N/A',
          },
        ];
      } else {
        fields = [
          ...caseFields,
          {
            label: 'Client Location',
            getValue: data => data.client_location || 'N/A',
          },
        ];
      }
    } else if (listingData.listing_type === 'INT') {
      fields = intepretationFields;
    } else if (listingData.listing_type === 'DOC') {
      fields = docFields;
    } else {
      fields = lcaFields;
    }

    return (
      <InnerFieldContainer>
        {fields.map(({ label, getValue }) => (
          <div key={label}>{renderField(label, getValue(listingData))}</div>
        ))}
      </InnerFieldContainer>
    );
  }, [listingData, interpretation]);

  const dateComponent = () => {
    if (listingData.listing_type !== 'INT') {
      let dateHeader = 'Deadline';
      let dateData = '';
      if (listingData.listing_type === 'CASE') {
        dateHeader = 'Next Court/Filing Date';
        dateData = formatTimestamp(listingData.upcoming_date);
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
          <H2>{listingData.title || 'Migrant seeking representation'}</H2>
        </BorderedSection>
        <BorderedSection>
          <IconTextGroup>
            <Icon type="tag" />
            <H4>Highlights</H4>
          </IconTextGroup>
          {listingFields}
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
            <Icon type="description" />
            <H4>Description</H4>
          </IconTextGroup>
          <P>{listingData.summary ? listingData.summary : 'Not Available'}</P>
        </BorderedSection>
      </InfoContainer>
      <BorderedSection>{Interest}</BorderedSection>
    </CaseDisplay>
  );
}
