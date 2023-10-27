'use client';

import React from 'react';
import styled from 'styled-components';
import InputDropdown from '@/components/Dropdowns/InputDropdown';

// styling
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const CenterBox = styled.div`
  width: 50%;
  height: 30vh;
  margin-bottom: 1rem;
  border: 1px solid black;
  display: grid;
  place-items: center;
  border-radius: 0.25rem;
`;

export default function page() {
  return (
    <Container>
      <CenterBox>
        <InputDropdown
          id="test-dropdown"
          label="Testing Dropdown"
          options={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Placeholder"
        />
      </CenterBox>
    </Container>
  );
}
