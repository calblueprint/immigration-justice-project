import { UUID } from 'crypto';

// table field types
export type ImmigrationLawExperienceEnum = 'LOW' | 'MEDIUM' | 'HIGH';

export type RoleEnum =
  | 'ATTORNEY'
  | 'INTERPRETER'
  | 'LEGAL_FELLOW'
  | 'TRANSLATOR';

export type ListingTypeEnum =
  | 'CASE'
  | 'LIMITED_ASSISTANCE'
  | 'TRANSLATION_REQUEST';

// join table rows
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

// sql table rows
export interface CaseListing {
  legal_server_id: string;
  title?: string;
  summary?: string;
  country?: string;
  client_location?: string;
  hours_per_month?: number;
  num_months?: number;
  is_remote?: boolean;
  needs_attorney?: boolean;
  needs_interpreter?: boolean;
  upcoming_date?: string;
  adjudicating_agency: string;
  languages: string[];
  relief_codes: string[];
  deadline?: string;
}

export interface Profile {
  user_id: UUID;
  first_name: string;
  last_name: string;
  location: string;
  hours_per_month: number;
  immigration_law_experience?: ImmigrationLawExperienceEnum;
  bar_number?: string;
  start_date: string;
  availability_description?: string;
  eoir_registered?: boolean;
}

export interface Interest {
  listing_id: string;
  user_id: UUID;
  listing_type: ListingTypeEnum;
  form_response: {
    rolesInterested: RoleEnum[];
    interestReason: string;
    start_date: Date;
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
