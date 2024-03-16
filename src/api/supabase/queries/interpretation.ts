import { Interpretation } from '@/types/schema';
import supabase from '../createClient';

export async function getAllInterpretation(): Promise<Interpretation[]> {
  const { data, error } = await supabase.rpc('get_interpretations');

  if (error) throw new Error(`Error reading interpretation: ${error.message}`);

  return data.map((i: Interpretation) => ({ ...i, listing_type: 'INT' }));
}
