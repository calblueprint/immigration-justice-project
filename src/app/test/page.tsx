'use client';

import { useState } from 'react';
import InputDropdown from '@/components/InputDropdown';
import TextInput from '@/components/TextInput';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem;
  box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  width: 50%;
`;

export default function Page() {
  const [throwaway, setThrowaway] = useState('');

  return (
    <ContainerDiv>
      <Box>
        <TextInput
          errorText=""
          erroring={false}
          label="Example Input"
          name="Example Input"
          placeholder=""
          type=""
          value={throwaway}
          setValue={setThrowaway}
        />
        <InputDropdown
          id="test-dropdown"
          label="Test"
          options={
            new Set([
              'Apple',
              'Banana',
              'Cherry',
              'Date',
              'Elderberry',
              'Fig',
              'Grape',
              'Honeydew',
              'Imbe',
              'Jackfruit',
              'Kiwi',
              'Lime',
              'Mango',
              'Nectarine',
              'Orange',
              'Papaya',
              'Quince',
              'Raspberry',
              'Strawberry',
              'Tomato',
              'Vanilla Bean',
              'Watermelon',
              'Zucchini',
            ])
          }
          multi
        />
        <TextInput
          errorText=""
          erroring={false}
          label="Example Input"
          name="Example Input"
          placeholder=""
          type=""
          value={throwaway}
          setValue={setThrowaway}
        />
      </Box>
    </ContainerDiv>
  );
}
