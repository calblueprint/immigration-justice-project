'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import { SpacerDiv } from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';
import supabase from '@/api/supabase/createClient';
import { useAuth } from '@/utils/AuthProvider';

export default function ResetPassword() {
  const auth = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [canReset, setCanReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async event => {
      if (event === 'PASSWORD_RECOVERY') {
        setCanReset(true);
      }
    });
  }, []);

  const resetPassword = async () => {
    if (newPassword !== newPassword2) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setErrorMessage(error.message);
    } else {
      const signOutError = await auth?.signOut();
      if (signOutError) {
        throw new Error(
          `An error occurred trying to sign out: ${signOutError.message}`,
        );
      }
      push('/confirm-reset-password');
    }
  };

  return (
    canReset && (
      <>
        <SpacerDiv $gap={0.625}>
          <H1>Set New Password</H1>
          {errorMessage !== '' && <P $color={COLORS.redMid}>{errorMessage}</P>}
        </SpacerDiv>
        <SpacerDiv>
          <TextInput
            label="New Password"
            placeholder="Password"
            errorText={newPassword.length < 6 ? 'Invalid Password' : ''}
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
        </SpacerDiv>
        <BigButton type="button" onClick={resetPassword}>
          <H4 $color="white">Set Password</H4>
        </BigButton>
      </>
    )
  );
}
