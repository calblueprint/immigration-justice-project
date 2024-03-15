'use client';

import ListingCard from '@/components/ListingCard';
import {
  CaseListing,
  Interpretation,
  DocumentTranslation,
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

const listingInt: Interpretation = {
  id: 'aaa-aaa-aaa-aaa-aaa',
  languages: ['English'],
  is_remote: true,
  title: 'Language Support - Interpretation',
  summary: 'Lorem ipsum dolor sit amet',
  listing_type: 'INT',
};

const listingDoc: DocumentTranslation = {
  id: 'aaa-aaa-aaa-aaa-aaa',
  languages: ['English'],
  title: 'Language Support - Interpretation',
  summary: 'Lorem ipsum dolor sit amet',
  listing_type: 'DOC',
  deadline: '2024-01-18T11:22:40+00:00',
  num_pages: 4,
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
        <ListingCard listing={listingInt} />
        <ListingCard listing={listingDoc} />
      </Box>
    </Container>
  );
}
