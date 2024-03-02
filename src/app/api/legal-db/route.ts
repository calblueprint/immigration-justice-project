import { CaseListing } from '@/types/schema';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

type CasesData = Omit<Omit<CaseListing, 'relief_codes'>, 'languages'>;

interface CaseLanguage {
  listing_id: string;
  language_name: string;
}

interface CaseRelief {
  listing_id: string;
  relief_code: string;
}

interface ReportData {
  id: string;
  matter_builtin_lookup_case_disposition_case_disposition_expn: string;
  matter_builtin_lookup_case_status_case_status_expn: string;
  program_name: string;
  matter_builtin_lookup_problem_code_legal_problem_code_expn: string;
  identification_number: string;
  person_builtin_lookup_language_language_expn: string;
  city: string;
  matter_builtin_lookup_country_country_of_origin_expn: string;
  state: string;
  person_builtin_lookup_living_arrangement_living_arrangement_expn: string;
  custom_custom_matter_custom_lookup_c9222481eaa6062f0b243da18f9add22_expn: string;
  pb_opportunity_summary: string;
  pb_opportunity_note: string;
  interpreter_needed: string;
  custom_custom_matter_custom_lookup_b6a226e574a50b6849998214b82e3570_expn: string;
}

export async function GET() {
  if (
    !(
      process.env.LEGAL_SERVER_URL &&
      process.env.LEGAL_SERVER_AUTHORIZATION &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_KEY
    )
  )
    throw new Error('Invalid legal server credentials');

  const legalServerResponse = await fetch(process.env.LEGAL_SERVER_URL, {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.LEGAL_SERVER_AUTHORIZATION,
    },
  });

  // parse data from legal server
  const legalServerData = (await legalServerResponse.json())
    .data as ReportData[];

  const casesData: CasesData[] = legalServerData.map(lsData => ({
    legal_server_id: lsData.identification_number,
    title: lsData.pb_opportunity_note || 'Migrant seeking representation',
    summary: lsData.pb_opportunity_summary,
    adjudicating_agency:
      lsData.custom_custom_matter_custom_lookup_b6a226e574a50b6849998214b82e3570_expn,
    client_location:
      lsData.city && lsData.state
        ? `${lsData.city}, ${lsData.state}`
        : undefined,
    country: lsData.matter_builtin_lookup_country_country_of_origin_expn,
    needs_interpreter: lsData.interpreter_needed === 'true',
  }));

  const languagesData: CaseLanguage[] = legalServerData
    .map(lsData => ({
      listing_id: lsData.identification_number,
      language_name: lsData.person_builtin_lookup_language_language_expn,
    }))
    .filter(d => d.language_name !== null);

  const reliefsData: CaseRelief[] = legalServerData
    .map(lsData => ({
      listing_id: lsData.identification_number,
      relief_code:
        lsData.matter_builtin_lookup_problem_code_legal_problem_code_expn,
    }))
    .filter(d => d.relief_code !== null);

  // upload data to supabase

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  // update cases data
  const { error: casesError } = await supabase.from('cases').upsert(casesData);
  if (casesError)
    throw new Error('Error updating cases DB. Check logs for details.');

  // update cases languages
  const { error: langsError } = await supabase
    .from('cases-languages')
    .upsert(languagesData);

  if (langsError)
    throw new Error('Error updating languages DB. Check logs for details.');

  // update cases reliefs
  const { error: reliefsError } = await supabase
    .from('cases-reliefs')
    .upsert(reliefsData);

  if (reliefsError)
    throw new Error('Error updating reliefs DB. Check logs for details.');

  return new Response('Ok');
}
