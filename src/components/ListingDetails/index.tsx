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
} from '@/types/schema';
import { useProfile } from '@/utils/ProfileProvider';
import { useAuth } from '@/utils/AuthProvider';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
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
  Subheading,
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

const interpretationFields: ListingField<Interpretation>[] = [
  // Languages
  {
    label: 'Language(s)',
    getValue: data => data.languages.join(', '),
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

function ListingFields<T extends Listing>({
  fields,
  listingData,
}: {
  fields: ListingField<T>[];
  listingData: T;
}) {
  return (
    <InnerFieldContainer>
      {fields.map(({ label, getValue }) => (
        <div key={label}>{renderField(label, getValue(listingData))}</div>
      ))}
    </InnerFieldContainer>
  );
}

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
        return (
          <ListingFields
            fields={caseInterpretationFields}
            listingData={listingData}
          />
        );
      }
      return (
        <ListingFields
          fields={[
            ...caseFields,
            {
              label: listingData.is_detained
                ? 'Custody Location'
                : 'Client Location',
              getValue: data => data.client_location || 'N/A',
            },
          ]}
          listingData={listingData}
        />
      );
    }
    if (listingData.listing_type === 'INT') {
      return (
        <ListingFields
          fields={interpretationFields}
          listingData={listingData}
        />
      );
    }
    if (listingData.listing_type === 'DOC') {
      return <ListingFields fields={docFields} listingData={listingData} />;
    }
    return <ListingFields fields={lcaFields} listingData={listingData} />;
  }, [listingData, interpretation]);

  const dateComponent = useMemo(() => {
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
          <Icon type="calendarBig" />
          <Flex>
            <Subheading $bold>{dateHeader}:</Subheading>
            <Subheading>&nbsp;{dateData}</Subheading>
          </Flex>
        </IconTextGroup>
      );
    }
    return null;
  }, [listingData]);

  const langSupportLabel = useMemo(() => {
    let label = '';
    if (listingData.listing_type === 'INT') {
      label = 'One-time Interpretation';
    } else if (listingData.listing_type === 'DOC') {
      label = 'Document Translation';
    } else if (interpretation && listingData.listing_type === 'CASE') {
      label = 'Case Interpretation';
    } else {
      return null;
    }
    return (
      <Subheading $color={COLORS.blueMid} $bold>
        {label}
      </Subheading>
    );
  }, [listingData, interpretation]);

  const interestSection = useMemo(() => {
    if (auth && auth.userId) {
      return profile?.profileData ? (
        <InterestForm
          listingData={listingData}
          interpretation={interpretation}
        />
      ) : (
        <>
          <H3>Please complete your profile before submitting interest.</H3>
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
  }, [auth, listingData, profile, interpretation]);

  return (
    <CaseDisplay>
      <InfoContainer>
        <BorderedSection>
          {langSupportLabel}
          <H2>{listingData.title || 'Migrant seeking representation'}</H2>
          {dateComponent}
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
              <Icon type="research" />
              <H4>Research Topic(s)</H4>
            </IconTextGroup>
            <P>{listingData.research_topic || 'Not Available'}</P>
          </BorderedSection>
        )}
        <BorderedSection>
          <IconTextGroup>
            <Icon type="description" />
            <H4>Description</H4>
          </IconTextGroup>
          <P>{listingData.summary || 'Not Available'}</P>
        </BorderedSection>
      </InfoContainer>
      <BorderedSection>{interestSection}</BorderedSection>
    </CaseDisplay>
  );
}

/* Sample Useage: test page
'use client';

import ListingDetails from '@/components/ListingDetails';
import {
  LimitedCaseAssignment,
  Interpretation,
  DocumentTranslation,
  CaseListing,
} from '@/types/schema';
import { Body, CardColumn, CaseDetailsContainer } from '../cases/styles';

const LCAInfo = {
  id: '099644df-c7ef-4eef-bd3b-76196da69886',
  title: 'LCA',
  summary:
    "CL has asylum claim due to persecution that happened 15+ year ago; since 1 yr bar will likely apply this will be withholding/CAT only. CL was threatened and attempted kidnapped/murdered (friend who was supposed to pick him up that day was in fact murdered b/c cartel though CL was also in the vehicle driven by friend) by local cartel group in Cuernavaca Morelos Mexico because he was in a relationship with a woman who was 'claimed' by a younger member of the cartel group. His relationship to the woman placed him at risk of retaliation. CL fled shortly thereafter and has not returned since.",
  country: 'Guatemala',
  deadline: '2024-03-16 19:47:39.385578+00', // timestamp (deadline to submit assignment)
  research_topic:
    'Cartel violence and operations in the area of Cuernavaca. Ties between cartel groups in the area and police/government. Police corruption and lack of investigation, impunity toward cartel groups that kidnap and murder in similar types of cases. Human rights violations in Mexico in general.',
  deliverable: 'Annotated Table of Contents with PDF of articles',
  languages: ['English', 'Spanish'],
  listing_type: 'LCA',
  upload_date: '2024-03-16 19:47:39.385578+00',
} as LimitedCaseAssignment;

const InterpInfo = {
  id: '099644df-c7ef-4eef-bd3b-76196da69886',
  title: 'Interpretation',
  summary: 'Smth',
  is_remote: true,
  languages: ['Farsi', 'Arabic'],
  listing_type: 'INT',
  upload_date: '2024-03-16 19:47:39.385578+00',
} as Interpretation;

const DocInfo = {
  id: '099644df-c7ef-4eef-bd3b-76196da69886',
  title: 'Doc Translation',
  summary: 'smth',
  deadline: '2024-03-16 19:47:39.385578+00',
  languages: ['Chinese', 'Viet'],
  num_pages: 3,
  listing_type: 'DOC',
  upload_date: '2024-03-16 19:47:39.385578+00',
} as DocumentTranslation;

const CaseInterpInfo = {
  id: '099644df-c7ef-4eef-bd3b-76196da69886',
  legal_server_id: '123',
  title: 'Case Interp',
  needs_attorney: false,
  needs_interpreter: true,
  summary: 'Something',
  country: 'USA',
  client_location: 'Berkeley',
  hours_per_week: 4,
  num_weeks: 8,
  is_remote: true,
  adjudicating_agency: 'Agency',
  upcoming_date: '2024-03-16 19:47:39.385578+00',
  is_detained: false,
  languages: ['English', 'French'],
  relief_codes: ['ABA', 'IJP'],
  listing_type: 'CASE',
} as CaseListing;

export default function Page() {
  return (
    <Body>
      <CardColumn />
      <CaseDetailsContainer>
        <ListingDetails listingData={CaseInterpInfo} interpretation />
      </CaseDetailsContainer>
    </Body>
  );
}

Edit Line 73 with the lines below corresponding to the desired ListingType 
LCA: 
<ListingDetails listingData={LCAInfo} />

1-Time Interpretation:
<ListingDetails listingData={InterpInfo} />

Document Translation: 
<ListingDetails listingData={DocInfo} />

Case Interpretation:
<ListingDetails listingData={CaseInterpInfo} interpretation />

Case: 
<ListingDetails listingData={CaseInterpInfo} /> 
*/
