'use client';

import BigButton from '@/components/BigButton';
import ProgressBar from '@/components/ProgressBar';
import { P } from '@/styles/text';
import { ReactNode } from 'react';
import { FormContainer, FormDiv, OuterDiv } from './styles';

export default function layout({ children }: { children: ReactNode }) {
  // track progress with onboarding context
  return (
    <OuterDiv>
      <ProgressBar
        steps={new Set(['Basic Info', 'Languages', 'Legal Experience', 'Done'])}
        progress={2}
      />
      <FormContainer>
        <FormDiv>
          {children}
          <BigButton>
            <P $color="white">Continue</P>
          </BigButton>
        </FormDiv>
      </FormContainer>
    </OuterDiv>
  );
}
