import supabase from '../createClient';

export async function getAllLCAListings() {
  const { data, error } = await supabase
    .from('limited-case-assignments')
    .select();
  if (error) {
    throw new Error(`An error occurred trying to read cases: ${error}`);
  }
  return data;
}
