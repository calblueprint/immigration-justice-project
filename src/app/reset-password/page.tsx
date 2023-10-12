'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../api/supabase/createClient';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { push } = useRouter();
  const resetPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw new Error(`An error occurred trying to sign in: ${error}`);
    }
    push('/login');
  };

  return (
    <>
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={resetPassword}>
        Reset Password
      </button>
    </>
  );
}
