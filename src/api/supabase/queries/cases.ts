import { UUID } from 'crypto';
import supabase from '../createClient';

export async function getAllCases() {
  const { data, error } = await supabase.from('cases').select();
  if (error) throw new Error(`Error fetching all cases: ${error.message}`);
  return data;
}

export async function getNCases(n: number) {
  const { data, error } = await supabase.from('cases').select().limit(n);
  if (error) throw new Error(`Error fetching ${n} cases: ${error.message}`);
  return data;
}

export async function getCaseById(id: UUID) {
  const { data, error } = await supabase.from('cases').select().eq('id', id);
  if (error) throw new Error(`Error fetching case ${id}: ${error.message}`);
  return data;
}

export async function getCaseLanguages(id: UUID) {
  const {data, error} = await supabase.from('cases-languages').select('iso_code').eq('listing_id', id);
  if (error) throw new Error(`Error fetching case languages ${id}: ${error.message}`);
  return data;
}

export async function getCaseReliefs(id: UUID) {
  const {data, error} = await supabase.from('cases-reliefs').select('relief_code').eq('listing_id', id);
  if (error) throw new Error(`Error fetching case releifs ${id}: ${error.message}`);
  return data;
}
