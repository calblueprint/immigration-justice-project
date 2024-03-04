import { LanguageSupport } from '@/types/schema';
import supabase from '../createClient';

/**
 * Fetches all non-case-specific language support entries  from the database
 * @returns a Promise of all non-case-specific language support objects
 */
export async function getAllLanguageSupport(): Promise<LanguageSupport[]> {
  const { data, error } = await supabase.from('language-support').select('*');
  if (error) {
    throw new Error(`Error reading language support: ${error.message}`);
  }
  return data;
}
