'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '../../types/schemaTypes';
import { getNCases } from '../../api/supabase/queries/cases';
import ListingCard from '../../components/ListingCard/ListingCard';
import { CardColumn, MainDisplay, PageContainer } from './styles';
import { H1 } from '../../styles/text';

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();

  // react hooks
  useEffect(() => {
    getNCases(20).then(casesData => {
      setCaseData(casesData);
    });
  }, []);

  // page structure
  return (
    <PageContainer>
      <H1>Browse Available Cases</H1>
      <MainDisplay>
        <CardColumn>
          {caseData.map(c => (
            <ListingCard
              key={c.id}
              caseData={c}
              isSelected={c.id === selectedCard}
              onClick={() => setSelectedCard(c.id)}
            />
          ))}
        </CardColumn>
      </MainDisplay>
    </PageContainer>
  );
}
