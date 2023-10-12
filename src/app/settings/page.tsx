'use client';

import { useRouter } from 'next/navigation';
import supabase from '../../api/supabase/createClient';

export default function Settings() {
  const { push } = useRouter();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`An error occurred trying to sign out: ${error}`);
    }
    push('/login');
  };
  const resetPassword = () => {
    push('/reset-password');
  };

  return (
    <>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
      <button type="button" onClick={resetPassword}>
        Reset Password
      </button>
    </>
  );
}

/*
Send email for password reset using .resetPasswordForEmail while providing a redirectTo parameter
Email link will work as a magic link and log the user in then take them to the url specified in the redirectTo parameter
Create form to update the password and call the .updateUser method with the new password */
