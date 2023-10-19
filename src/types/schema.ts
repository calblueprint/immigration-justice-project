import { UUID } from 'crypto';

export interface CaseListing {
  id: UUID;
  title: string;
  summary: string;
  country: string;
  client_location: string;
  legal_server_id: number;
  hours_per_month: number;
  num_months: number;
  languages: string[];
  is_remote: boolean;
  in_court: boolean;
  needs_attorney: boolean;
  needs_interpreter: boolean;
  upcoming_date: string;
  relief_sought: string;
  active: boolean;
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
  first_name: string;
  last_name: string;
  location: string;
  roles: string[];
  hours_per_month: number;
  immigration_law_experience: string;
  languages: string[];
  bar_number: string;
  start_date: string;
  availability_description: string;
  eoir_registered: boolean;
  interest_ids: UUID[];
}

export interface Interest {
  id: UUID;
  listing_id: UUID;
  user_id: UUID;
  listing_type: number;
  form_response: {
    interestType: string;
    interestReason: string;
    start_date: string;
  };
}
