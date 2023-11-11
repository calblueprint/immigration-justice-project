import { Interest } from '@/types/schema';
import supabase from '../createClient';

/** Get all interest from supabase interest table. */
export async function getAllInterests() {
  const { data, error } = await supabase.from('interests').select();

  if (error) {
    throw new Error(`Error reading interests: ${error.message}`);
  }
  return data;
}

/** Insert a new interest object into supabase interest table. */
export async function insertInterest(interest: Interest) {
  const { error } = await supabase.from('interests').insert(interest).select();
  if (error) {
    throw new Error(`Error inserting an interest: ${error.message}`);
  }
}
