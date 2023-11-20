import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import supabase from '../createClient';

export async function getAllCases(): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('getCasesData');
  if (error) throw new Error(`Error fetching all cases: ${error.message}`);
  return data;
}

export async function getNCases(n: number): Promise<CaseListing[]> {
  const { data, error } = await supabase.rpc('getCasesData').limit(n);
  if (error) throw new Error(`Error fetching ${n} cases: ${error.message}`);
  return data;
}

export async function getCaseById(id: UUID) {
  const { data, error } = await supabase.from('cases').select().eq('id', id);
  if (error) throw new Error(`Error fetching case ${id}: ${error.message}`);
  return data;
}
