'use client';

import { ReactNode } from 'react';
import { OuterDiv } from './styles';

export default function layout({ children }: { children: ReactNode }) {
  return <OuterDiv>{children}</OuterDiv>;
}
