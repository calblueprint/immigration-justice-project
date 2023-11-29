import { Interest } from '@/types/schema';
import supabase from '../createClient';

/**
 * Fetches all interests from the database
 * @returns a Promise of all interests objects 
 */
export async function getAllInterests() {
  const { data, error } = await supabase.from('interests').select();

  if (error) {
    throw new Error(`Error reading interests: ${error.message}`);
  }
  return data;
}

/**
 * Upserts an interest object into the database's interest table
 * @param interest - an interest object 
 */
export async function upsertInterest(interest: Interest) {
  const { error } = await supabase.from('interests').upsert(interest).select();
  if (error) {
    throw new Error(`Error inserting an interest: ${error.message}`);
  }
}
