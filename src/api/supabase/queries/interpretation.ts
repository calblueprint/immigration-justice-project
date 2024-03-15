import { Interpretation } from '@/types/schema';
import supabase from '../createClient';

export async function getAllInterpretation(): Promise<Interpretation[]> {
  const { data, error } = await supabase.from('interpretation').select();
  if (error) throw new Error(`Error reading interpretation: ${error.message}`);
  return data.map((i: Interpretation) => ({ ...i, listing_type: 'INT' }));
}
