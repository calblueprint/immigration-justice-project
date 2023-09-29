import { UUID } from 'crypto';
import supabase from '../createClient';

export async function getAllCases() {
  const { data, error } = await supabase.from('cases').select();

  if (error) {
    throw new Error(`An error occurred trying to read cases: ${error}`);
  }

  return data;
}

export async function getCaseById(id: UUID) {
  const { data, error } = await supabase.from('cases').select().eq('id', id);

  if (error) {
    throw new Error(`An error occurred trying to read cases: ${error}`);
  }

  return data;
}
