'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UUID } from 'crypto';
import { CaseListing } from '../../types/schemaTypes';
import { getNCases } from '../../api/supabase/queries/cases';
import ListingCard from '../../components/ListingCard';

// styled components
const PageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
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
  margin-top: 2rem;
  width: 100%;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid black;
  padding-right: 2rem;
`;

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();

  // react hooks
  useEffect(() => {
    getNCases(20).then(casesData => {
      setCaseData(casesData);
    });
  }, []);

  // onclicks
  function onCardClick(id: UUID) {
    setSelectedCard(id);
  }

  // page structure
  return (
    <PageContainer>
      <PageTitle>Browse Available Cases</PageTitle>
      <MainDisplay>
        <CardColumn>
          {caseData.map(c => (
            <ListingCard
              key={c.id}
              caseData={c}
              isSelected={c.id === selectedCard}
              onClick={() => onCardClick(c.id)}
            />
          ))}
        </CardColumn>
      </MainDisplay>
    </PageContainer>
  );
}
