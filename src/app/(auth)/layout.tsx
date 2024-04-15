'use client';

import { ReactNode } from 'react';
import { SmallCardForm } from '@/styles/containers';
import { OuterDiv } from './styles';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <OuterDiv>
      <SmallCardForm>{children}</SmallCardForm>
    </OuterDiv>
  );
}
