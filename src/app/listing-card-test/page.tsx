'use client';

import ListingCard from '@/components/ListingCard';
import {
  CaseListing,
  LanguageSupport,
  LimitedCaseAssignment,
} from '@/types/schema';
import styled from 'styled-components';

const listingCase: CaseListing = {
  listing_type: 'CASE',
  languages: ['English'],
  legal_server_id: '123',
  relief_codes: ['Asylum'],
  needs_attorney: true,
  needs_interpreter: true,
  adjudicating_agency: 'ICH',
  client_location: 'San Diego, CA',
  country: 'South Africa',
  upcoming_date: '2024-01-18T11:22:40+00:00',
  hours_per_week: 30,
  num_weeks: 10,
  is_remote: false,
  summary: 'Lorem ipsum dolor sit amet',
  title: 'Case, Legal',
  id: 'aaa-aaa-aaa-aaa-aaa-aaa',
};

const listingCaseInt: CaseListing = {
  ...listingCase,
  title: 'Case, Interpretation',
};

const listingLCA: LimitedCaseAssignment = {
  id: 'aaa-aaa-aaa-aaa-aaa',
  languages: ['English', 'Spanish', 'French'],
  listing_type: 'LCA',
  research_topic: 'Lorem ipsum dolor sit amet',
  country: 'Vietnam',
  deadline: '2024-01-18T11:22:40+00:00',
  title: 'Limited Case Assistance',
  summary: 'Lorem ipsum dolor sit amet',
  deliverable: 'PDF',
};

const listingLang: LanguageSupport = {
  id: 'aaa-aaa-aaa-aaa-aaa',
  languages: ['English'],
  listing_type: 'LS',
  deadline: '2024-01-18T11:22:40+00:00',
  is_remote: false,
  title: 'Language Support - Interpretation',
  summary: 'Lorem ipsum dolor sit amet',
};

const listingDoc: LanguageSupport = {
  ...listingLang,
  num_pages: 4,
  is_remote: true,
  title: 'Language Support - Documents',
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 0;
`;

const Box = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

export default function Page() {
  return (
    <Container>
      <Box>
        <ListingCard listing={listingCase} isSelected />
        <ListingCard listing={listingCaseInt} interpretation />
        <ListingCard listing={listingLCA} />
        <ListingCard listing={listingLang} />
        <ListingCard listing={listingDoc} />
      </Box>
    </Container>
  );
}
