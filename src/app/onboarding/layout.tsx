import { ReactNode } from 'react';
import OnboardingManager from '@/components/OnboardingManager';
import OnboardingProvider from '@/utils/OnboardingProvider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <OnboardingManager>{children}</OnboardingManager>
    </OnboardingProvider>
  );
}
