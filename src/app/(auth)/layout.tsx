'use client';

import { ReactNode } from 'react';
import { FormDiv, OuterDiv } from './styles';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <OuterDiv>
      <FormDiv>{children}</FormDiv>
    </OuterDiv>
  );
}
