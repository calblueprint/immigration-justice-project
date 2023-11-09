'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/TextInput/index';
import { H1, H4, P, AColored } from '@/styles/text';
import supabase from '@/api/supabase/createClient';
import COLORS from '@/styles/colors';
import {
  OuterDiv,
  FormDiv,
  H4Centered,
  QuestionsDiv,
  SpacerDiv,
} from '@/app/(auth)/styles';
import BigButton from '@/components/BigButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();
  // commenting out Sign Up to use in the next PR -> create a separate sign in page
  /*
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign up: ${error.message}`);
    }
    push('/');
  };
  */

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign in: ${error.message}`);
    }
    push('/');
  };

  return (
    <OuterDiv>
      <FormDiv>
        <H1>Log In</H1>
        <SpacerDiv>
          <QuestionsDiv>
            <TextInput
              label="Email"
              placeholder="email@example.com"
              erroring={false}
              errorText="Email Error" // {errorMessage}
              type="email"
              name="email"
              value={email}
              setValue={setEmail}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              erroring={false}
              errorText="Password Error"
              type="password"
              name="password"
              value={password}
              setValue={setPassword}
            />
          </QuestionsDiv>
          <P>
            <AColored $color={COLORS.greyMid} href="/reset-password">
              Forgot your password?
            </AColored>
          </P>
        </SpacerDiv>
        <SpacerDiv>
          <BigButton type="button" onClick={handleSignIn}>
            <H4 $color="white">Sign in</H4>
          </BigButton>
          <H4Centered>
            Don’t have an account yet?{' '}
            <AColored $color={COLORS.greyDark} href="/signup">
              Sign up
            </AColored>
          </H4Centered>
        </SpacerDiv>
      </FormDiv>
    </OuterDiv>
  );
}
