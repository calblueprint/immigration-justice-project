'use client';

import BigButton from '@/components/BigButton';
import ProgressBar from '@/components/ProgressBar';
import { P } from '@/styles/text';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  // track progress with onboarding context
  return (
    <>
      <ProgressBar
        steps={new Set(['Basic Info', 'Languages', 'Legal Experience', 'Done'])}
        progress={2}
      />
      {children}
      <BigButton>
        <P $color="white">Continue</P>
      </BigButton>
    </>
  );
}
