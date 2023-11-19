'use client';

import { useState } from 'react';
import InputDropdown from '@/components/InputDropdown';
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
  width: 33.75rem;
`;

export default function Page() {
  const [fruits, setFruits] = useState(new Set<string>());
  const [writingUtensil, setWritingUtensil] = useState('');
  const [greenGlassDoor, setGreenGlassDoor] = useState('');

  return (
    <ContainerDiv>
      <Box>
        <InputDropdown
          label="Fruits"
          placeholder="Apple"
          multi
          value={fruits}
          setValue={setFruits}
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
              'Pineapple',
              'Quince',
              'Raspberry',
              'Strawberry',
              'Tomato',
              'Vanilla Bean',
              'Watermelon',
              'Zucchini',
            ])
          }
        />
        <InputDropdown
          label="Writing Utensil"
          placeholder="Pen"
          value={writingUtensil}
          setValue={setWritingUtensil}
          error="Wrong utensil!"
          options={
            new Set([
              'Pen',
              'Pencil',
              'Mechanical Pencil',
              'Chalk',
              'Etch A Sketch',
              'Quill',
              'Mouse',
            ])
          }
        />
        <InputDropdown
          label="GGD"
          disabled
          placeholder="Word"
          value={greenGlassDoor}
          setValue={setGreenGlassDoor}
          options={new Set(['Map', 'Car', 'Gas', 'Cloud', 'Water'])}
        />
      </Box>
    </ContainerDiv>
  );
}
