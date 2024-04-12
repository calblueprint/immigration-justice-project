import supabase from '../createClient';

/**
 * Fetches all non-case-specific language support entries  from the database
 * @returns a Promise of all non-case-specific language support objects
 */
export async function verifyUserPassword(password: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('verify_user_password', {
    password,
  });

  if (error) {
    throw new Error(`Error verifying user password: ${error.message}`);
  }

  return data;
}
