'use client';

import OnboardingProvider from '@/utils/OnboardingProvider';
import { ReactNode } from 'react';
import OnboardingManager from '@/components/OnboardingManager';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <OnboardingManager>{children}</OnboardingManager>
    </OnboardingProvider>
  );
}
