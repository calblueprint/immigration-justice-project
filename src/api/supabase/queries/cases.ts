import { UUID } from 'crypto';
import supabase from '../createClient';

export async function getAllCases() {
  const { data, error } = await supabase.from('cases').select();
  if (error) throw error;
  return data;
}

export async function getNCases(n: number) {
  const { data, error } = await supabase.from('cases').select().limit(n);
  if (error) throw error;
  return data;
}

export async function getCaseById(id: UUID) {
  const { data, error } = await supabase.from('cases').select().eq('id', id);
  if (error) throw error;
  return data;
}
