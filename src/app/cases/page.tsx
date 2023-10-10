'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '../../types/schemaTypes';
import { getNCases } from '../../api/supabase/queries/cases';
import ListingCard from '../../components/ListingCard/ListingCard';
import { CardColumn, MainDisplay, PageContainer, PageTitle } from './styles';

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
