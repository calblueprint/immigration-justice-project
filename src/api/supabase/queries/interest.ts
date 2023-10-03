import supabase from '../createClient';
import { Interest } from '../../../types/schemaTypes';

/** Get all interest from supabase interest table. */
export async function getAllInterests() {
  const { data, error } = await supabase.from('interests').select();

  if (error) {
    throw new Error(`An error occurred trying to read interests: ${error}`);
  }
  return data;
}

/** Insert a new interest object into supabase interest table. */
export async function insertInterest(interest: Interest) {
  const { error } = await supabase.from('interests').insert(interest).select();

  if (error) {
    throw new Error(`An error occurred trying to insert an interest: ${error}`);
  }
}
