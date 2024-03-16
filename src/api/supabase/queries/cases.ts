import { CaseListing } from '@/types/schema';
import supabase from '../createClient';

export async function getAllCases(): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('get_cases');
  if (error) throw new Error(`Error fetching all cases: ${error.message}`);

  return data.map((c: CaseListing) => ({ ...c, listing_type: 'CASE' }));
}

export async function getNCases(n: number): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('get_cases').limit(n);
  if (error) throw new Error(`Error fetching ${n} cases: ${error.message}`);

  return data.map((c: CaseListing) => ({ ...c, listing_type: 'CASE' }));
}
