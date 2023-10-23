'use client';

import ProfileProvider from '@/utils/ProfileProvider';
import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
