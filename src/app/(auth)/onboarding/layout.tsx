'use client';

import BigButton from '@/components/BigButton';
import ProgressBar from '@/components/ProgressBar';
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
      <BigButton>Continue</BigButton>
    </>
  );
}
