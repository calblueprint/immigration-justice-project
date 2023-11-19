import { UUID } from 'crypto';
import supabase from '../createClient';

export async function getAllCases() {
  const { data, error } = await supabase
    .from('cases')
    .select()
    .or('needs_interpreter.eq.true,needs_attorney.eq.true');
  if (error) throw new Error(`Error fetching all cases: ${error.message}`);
  return data;
}

export async function getNCases(n: number) {
  const { data, error } = await supabase
    .from('cases')
    .select()
    .or('needs_interpreter.eq.true,needs_attorney.eq.true')
    .limit(n);
  if (error) throw new Error(`Error fetching ${n} cases: ${error.message}`);
  return data;
}

export async function getCaseById(id: UUID) {
  const { data, error } = await supabase.from('cases').select().eq('id', id);
  if (error) throw new Error(`Error fetching case ${id}: ${error.message}`);
  return data;
}
