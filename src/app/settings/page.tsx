'use client';

import { useRouter } from 'next/navigation';
import supabase from '../../api/supabase/createClient';

export default function Settings() {
  const { push } = useRouter();
  const handleSignOut = async () => {
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
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
      <button type="button" onClick={resetPassword}>
        Reset Password
      </button>
    </>
  );
}
