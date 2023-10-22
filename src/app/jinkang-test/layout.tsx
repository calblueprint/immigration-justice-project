'use client';

import { ReactNode } from 'react';
import ProfileProvider from '@/utils/ProfileProvider';

export default function TestLayout({ children }: { children: ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
