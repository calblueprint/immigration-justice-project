'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4 } from '@/styles/text';
import { QuestionsDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import supabase from '../../../api/supabase/createClient';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [canReset, setCanReset] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async event => {
      if (event === 'PASSWORD_RECOVERY') {
        setCanReset(true);
      }
    });
  }, []);

  const resetPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      throw new Error(
        `An error occurred trying to reset password: ${error.message}`,
      );
    }
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      throw new Error(
        `An error occurred trying to sign out: ${signOutError.message}`,
      );
    }
    push('/confirm-reset-password');
  };

  return (
    canReset && (
      <>
        <H1>Set New Password</H1>
        <QuestionsDiv>
          <TextInput
            label="New Password"
            placeholder="Password"
            type="password"
            id="newpass"
            value={newPassword}
            setValue={setNewPassword}
          />
          <TextInput
            label="Confirm New Password"
            placeholder="Password"
            type="password"
            id="confirmnewpass"
            value={newPassword2}
            setValue={setNewPassword2}
          />
        </QuestionsDiv>
        <BigButton type="button" onClick={resetPassword}>
          <H4 $color="white">Set Password</H4>
        </BigButton>
      </>
    )
  );
}
