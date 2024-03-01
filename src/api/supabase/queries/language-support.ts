import { LanguageSupport } from '@/types/schema';
import supabase from '../createClient';

export async function getAllLanguageSupport(): Promise<LanguageSupport[]> {
  const { data, error } = await supabase.from('language-support').select('*');

  if (error) {
    throw new Error(`Error reading language support: ${error.message}`);
  }
  return data;
}
