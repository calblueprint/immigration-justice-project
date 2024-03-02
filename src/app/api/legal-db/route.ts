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
  matter_builtin_lookup_case_disposition_case_disposition_expn: string | null;
  matter_builtin_lookup_case_status_case_status_expn: string | null;
  program_name: string | null;
  matter_builtin_lookup_problem_code_legal_problem_code_expn: string | null;
  identification_number: string;
  person_builtin_lookup_language_language_expn: string | null;
  city: string | null;
  matter_builtin_lookup_country_country_of_origin_expn: string | null;
  state: string | null;
  person_builtin_lookup_living_arrangement_living_arrangement_expn:
    | string
    | null;
  custom_custom_matter_custom_lookup_c9222481eaa6062f0b243da18f9add22_expn:
    | string
    | null;
  pb_opportunity_summary: string | null;
  pb_opportunity_note: string | null;
  interpreter_needed: string | null;
  custom_custom_matter_custom_lookup_b6a226e574a50b6849998214b82e3570_expn:
    | string
    | null;
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

  const openCases = legalServerData.filter(
    lsData =>
      lsData.matter_builtin_lookup_case_disposition_case_disposition_expn?.toUpperCase() ===
      'OPEN',
  );

  const casesData: CasesData[] = openCases.map(lsData => {
    const legalProblem =
      lsData.matter_builtin_lookup_problem_code_legal_problem_code_expn?.toLowerCase();
    const seekingAsylum = legalProblem?.match(/asylum/);
    const seekingBond = legalProblem?.match(/bond/);
    const seekingParole = legalProblem?.match(/parole/);
    const inRemoval = legalProblem?.match(/removal defense/);
    const inDetention =
      lsData.person_builtin_lookup_living_arrangement_living_arrangement_expn
        ?.toLowerCase()
        .match(/detention/);

    const caseData: CasesData = {
      legal_server_id: lsData.identification_number,
      title: lsData.pb_opportunity_note || 'Migrant seeking representation',
      summary: lsData.pb_opportunity_summary || '',
      adjudicating_agency:
        lsData.custom_custom_matter_custom_lookup_b6a226e574a50b6849998214b82e3570_expn ||
        '',
      client_location:
        lsData.city && lsData.state
          ? `${lsData.city}, ${lsData.state}`
          : undefined,
      country:
        lsData.matter_builtin_lookup_country_country_of_origin_expn || '',
      needs_interpreter: lsData.interpreter_needed === 'true',
      needs_attorney: true,
    };

    // determine time commitment
    if (inRemoval && seekingAsylum) {
      caseData.hours_per_month = 45;
      caseData.num_months = 6;
    } else if (inDetention && inRemoval) {
      caseData.hours_per_month = 25;
      caseData.num_months = 12;
    } else if (inDetention && seekingAsylum) {
      caseData.hours_per_month = 40;
      caseData.num_months = 6;
    } else if (!inDetention && seekingAsylum) {
      caseData.hours_per_month = 13;
      caseData.num_months = 2;
    } else if (inDetention && seekingParole) {
      caseData.hours_per_month = 13;
      caseData.num_months = 1;
    } else if (inDetention && seekingBond) {
      caseData.hours_per_month = 17;
      caseData.num_months = 1;
    }

    return caseData;
  });

  const languagesData: CaseLanguage[] = openCases
    .map(lsData => ({
      listing_id: lsData.identification_number,
      language_name: lsData.person_builtin_lookup_language_language_expn || '',
    }))
    .filter(d => d.language_name);

  const reliefsData: CaseRelief[] = openCases
    .map(lsData => ({
      listing_id: lsData.identification_number,
      relief_code:
        lsData.matter_builtin_lookup_problem_code_legal_problem_code_expn || '',
    }))
    .filter(d => d.relief_code);

  // upload data to supabase

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  // update cases data
  const { error: casesError } = await supabase.from('cases').upsert(casesData);
  if (casesError)
    throw new Error(`Error updating cases DB: ${casesError.message}`);

  // update cases languages
  const { error: langsError } = await supabase
    .from('cases-languages')
    .upsert(languagesData);

  if (langsError)
    throw new Error(`Error updating languages DB: ${langsError.message}`);

  // update cases reliefs
  const { error: reliefsError } = await supabase
    .from('cases-reliefs')
    .upsert(reliefsData);

  if (reliefsError)
    throw new Error(`Error updating reliefs DB: ${reliefsError.message}`);

  return new Response('Ok');
}
