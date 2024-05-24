import supabase from '../createClient';

/**
 * Checks if the current password is different from the current user's password
 * @returns a Promise of whether the password is different
 */
export async function verifyNewPassword(password: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('verify_user_password', {
    password,
  });

  if (error) {
    throw new Error(`Error verifying user password: ${error.message}`);
  }

  return data;
}
