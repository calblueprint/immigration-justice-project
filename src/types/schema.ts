import { UUID } from 'crypto';

// note: relief is a string

// table field types
export type Timestamp =
  `${string}-${string}-${string} ${string}:${string}:${string}+${string}`;

export type ImmigrationLawExperience =
  | 'No Experience'
  | 'One Experience'
  | 'Multiple Experiences';

export type Role =
  | 'Attorney'
  | 'Interpreter'
  | 'Research Fellow'
  | 'Translator';

export type ListingType = 'Case' | 'Limited Assistance' | 'Translation Request';

export interface Language {
  iso_code: string;
  can_read: boolean;
  can_write: boolean;
}

// sql tables
export interface CaseListing {
  id: UUID;
  title: string;
  summary: string;
  country: string;
  client_location: string;
  legal_server_id: number;
  hours_per_month: number;
  num_months: number;
  is_remote: boolean;
  in_court: boolean;
  needs_attorney: boolean;
  needs_interpreter: boolean;
  upcoming_date: Timestamp;
}

export interface Profile {
  user_id: UUID;
  first_name: string;
  last_name: string;
  preferred_first_name: string;
  location: string;
  hours_per_month: number;
  immigration_law_experience: ImmigrationLawExperience;
  bar_number: string;
  start_date: Timestamp;
  availability_description: string;
  eoir_registered: boolean;
}

export interface Interest {
  listing_id: UUID;
  user_id: UUID;
  listing_type: ListingType;
  form_response: {
    rolesInterested: Role[];
    interestReason: string;
    start_date: Timestamp;
  };
}

// irrelevant until mvp
export interface LimitedAssistance {
  id: UUID;
  summary: string;
  languages: string[];
  country: string;
  experience_level: string;
  deadline: string;
  interest_ids: UUID[];
}

export interface TranslationRequest {
  id: UUID;
  summary: string;
  languages: string[];
  interest_ids: UUID[];
}
