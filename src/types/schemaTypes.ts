import { UUID } from 'crypto';

export interface CaseListing {
  id: UUID;
  summary: string;
  languages: string[];
  country: string;
  legal_server_id: number;
  client_initials: string;
  time_to_complete: string;
  is_remote: boolean;
  client_location: string;
  program: string;
  upcoming_hearing_date: string;
  needs_interpreter: boolean;
  interest_ids: UUID[];
}

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

export interface Profile {
  user_id: UUID;
  roles: string[];
  languages: string[];
  accreditations: string[];
  hours_per_week: number;
  immigration_law_experience: string;
  bar_number: string;
  start_date: string;
  interest_ids: UUID[];
}

export interface Interest {
  id: UUID | string;
  listing_id: UUID;
  listing_type: string;
  user_id: UUID;
  form_response: {
    interestType: string[];
    whyInterested: string;
  };
}
