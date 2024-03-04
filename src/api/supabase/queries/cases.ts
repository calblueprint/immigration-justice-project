import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import supabase from '../createClient';

export async function getAllCases(): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('getCasesData');
  if (error) throw new Error(`Error fetching all cases: ${error.message}`);
  return (data as CaseListing[]).map(c => ({
    ...c,
    languages: c.languages.filter(l => l),
    relief_codes: c.relief_codes.filter(r => r),
  }));
}

export async function getNCases(n: number): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('getCasesData').limit(n);
  if (error) throw new Error(`Error fetching ${n} cases: ${error.message}`);
  return (data as CaseListing[]).map(c => ({
    ...c,
    languages: c.languages.filter(l => l),
    relief_codes: c.relief_codes.filter(r => r),
  }));
}

export async function getCaseById(id: UUID): Promise<CaseListing> {
  const { data, error } = await supabase.from('cases').select().eq('id', id);
  if (error) throw new Error(`Error fetching case ${id}: ${error.message}`);
  return data[0] as CaseListing;
}
