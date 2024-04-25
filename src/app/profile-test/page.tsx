'use client';

import ListingDetails from '@/components/ListingDetails';
import {
  CaseListing,
  DocumentTranslation,
  Interpretation,
  LimitedCaseAssignment,
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
  client_location: 'San Jose, CA',
  hours_per_week: 4,
  num_weeks: 8,
  is_remote: undefined,
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
