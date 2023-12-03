import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { openSans } from '@/styles/fonts';

const BigButton = styled.button<{ disabled?: boolean }>`
  background: ${props => (props.disabled ? COLORS.greyLight : COLORS.blueMid)};
  color: ${props => (props.disabled ? COLORS.greyMid : 'white')};
  // font should be same as H4
  ${openSans.style}
  font-size: 1rem;
  font-weight: 600;

  padding: 0.94rem 0;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${props =>
      props.disabled ? COLORS.greyLight : COLORS.blueDark};
  }
  &:active {
    background: ${props =>
      props.disabled ? COLORS.greyLight : COLORS.blueDarker};
  }
`;

export default BigButton;

/**
  'use client';

  import React from 'react';
  import BigButton from '@/components/BigButton';

  export default function ButtonTest() {
    return (
      <BigButton
        onClick={() => {
          console.error('hi!');
        }}
      >
        Big Button
      </BigButton>
    );
  }
 */
