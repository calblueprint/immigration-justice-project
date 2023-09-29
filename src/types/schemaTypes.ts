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
  interest_ids: number[];
}
