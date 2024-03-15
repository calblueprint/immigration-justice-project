import { DocumentTranslation } from '@/types/schema';
import supabase from '../createClient';

/**
 * Fetches all non-case-specific language support entries  from the database
 * @returns a Promise of all non-case-specific language support objects
 */
export async function getAllDocuments(): Promise<DocumentTranslation[]> {
  const { data, error } = await supabase
    .from('document-translation')
    .select('*');
  if (error) {
    throw new Error(`Error reading document translation: ${error.message}`);
  }
  return data.map((d: DocumentTranslation) => ({ ...d, listing_type: 'DOC' }));
}
