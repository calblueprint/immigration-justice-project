'use client';

import OnboardingManager from '@/components/OnboardingManager';
import OnboardingProvider from '@/utils/OnboardingProvider';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <OnboardingManager>{children}</OnboardingManager>
    </OnboardingProvider>
  );
}
