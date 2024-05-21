import type { UUID } from 'crypto';

export interface Profile {
  user_id: UUID;
  first_name: string;
  last_name: string;
  eoir_registered?: boolean;
  hours_per_month: number;
  bar_number?: string;
  start_date: string; // timestamp
  availability_description?: string;
  expected_bar_date?: string; // timestamp
  country: string;
  state: string;
  city: string;
  phone_number: string;
  state_barred?: string;
  legal_credential_comment?: string;
}

export interface ProfileToUpload
  extends Omit<
    Profile,
    | 'start_date'
    | 'expected_bar_date'
    | 'availability_description'
    | 'state_barred'
    | 'eoir_registered'
    | 'bar_number'
    | 'legal_credential_comment'
  > {
  start_date: Date;
  expected_bar_date?: Date | null;
  availability_description?: string | null;
  state_barred?: string | null;
  eoir_registered?: boolean | null;
  bar_number?: string | null;
  legal_credential_comment?: string | null;
}

// only used for ProfileRoles
export type RoleEnum = 'ATTORNEY' | 'INTERPRETER' | 'LEGAL_FELLOW';

export interface ProfileLanguage {
  user_id: UUID;
  language_name: string;
  can_read: boolean;
  can_speak: boolean;
}

export interface ProfileRole {
  user_id: UUID;
  role: RoleEnum;
}

export type ListingType =
  | 'CASE'
  | 'CASE_INT' // case interpretation
  | 'LCA'
  | 'DOC'
  | 'INT'; // interpretation

export interface Interest {
  listing_id: UUID;
  user_id: UUID;
  listing_type: ListingType;
  form_response: {
    needs_interpreter?: boolean; // for attorneys only
    interest_reason?: string;
    start_date?: Date; // for cases and case interpretation
  };
}

export interface CaseListing {
  id: UUID;
  legal_server_id: string;
  title?: string;
  needs_attorney?: boolean;
  needs_interpreter?: boolean;
  summary?: string;
  country?: string;
  client_location?: string;
  hours_per_week?: number;
  num_weeks?: number;
  is_remote?: boolean;
  adjudicating_agency?: string;
  upcoming_date?: string; // timestamp
  is_detained?: boolean;
  languages: string[];
  relief_codes: string[];
  listing_type: 'CASE';
}

export interface LimitedCaseAssignment {
  id: UUID;
  title: string;
  summary: string;
  country: string;
  deadline: string; // timestamp (deadline to submit assignment)
  research_topic: string;
  deliverable: string; // expected deliverable
  languages: string[];
  listing_type: 'LCA';
  upload_date: string; // timestamp
}

export interface Interpretation {
  id: UUID;
  title: string;
  summary: string;
  is_remote: boolean;
  languages: string[];
  listing_type: 'INT';
  upload_date: string; // timestamp
}

export interface DocumentTranslation {
  id: UUID;
  title: string;
  summary: string;
  deadline: string;
  languages: string[];
  num_pages: number;
  listing_type: 'DOC';
  upload_date: string; // timestamp
}

// union of types, used for ListingCard and CaseDetail components etc.
export type Listing =
  | CaseListing
  | Interpretation
  | LimitedCaseAssignment
  | DocumentTranslation;

export type LanguageSupport =
  | DocumentTranslation
  | Interpretation
  | CaseListing;
