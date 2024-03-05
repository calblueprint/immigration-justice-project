'use client';

import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import { FormDiv, OuterDiv } from './styles';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <OuterDiv>
        <FormDiv>{children}</FormDiv>
      </OuterDiv>
    </>
  );
}
