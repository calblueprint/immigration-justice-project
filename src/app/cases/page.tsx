'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CaseListing } from '../../types/schemaTypes';
import { getAllCases } from '../../api/supabase/queries/cases';
import ListingCard from '../../components/ListingCard';
import timestampStringToDate from '../../utils/helpers';

// styled components
const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  text-align: left;
  margin: 0;
  margin-right: auto;
`;

const MainDisplay = styled.main`
  display: grid;
  grid-template-columns: 5fr 10fr;
  margin-top: 1rem;
  width: 100%;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Page() {
  const [data, setData] = useState<CaseListing[]>([]);

  // react hooks
  useEffect(() => {
    getAllCases().then(casesData => {
      setData(casesData);
    });
  }, []);

  // page structure
  return (
    <PageContainer>
      <PageTitle>Browse Available Cases</PageTitle>
      <MainDisplay>
        <CardColumn>
          {data.map(d => (
            <ListingCard
              key={d.id}
              title="Case title."
              deadline={timestampStringToDate(d.time_to_complete)}
              languages={d.languages}
              rolesNeeded={['Attorney'].concat(
                d.needs_interpreter ? ['Interpreter'] : [],
              )}
            />
          ))}
        </CardColumn>
      </MainDisplay>
    </PageContainer>
  );
}
