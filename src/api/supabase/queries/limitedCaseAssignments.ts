import { LimitedCaseAssignment } from '@/types/schema';
import supabase from '../createClient';

export async function getAllLCA(): Promise<LimitedCaseAssignment[]> {
  const { data, error } = await supabase.rpc('get_lca');

  if (error) throw new Error(`Error reading LCA: ${error.message}`);

  return data.map((lca: LimitedCaseAssignment) => ({
    ...lca,
    listing_type: 'LCA',
  }));
}
