'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import FilterDropdown from '@/components/FilterDropdown';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard';
import { H1, H2 } from '@/styles/text';
import ButtonDropdown from '@/components/Dropdowns/ButtonDropdown';
import {
  CardColumn,
  MainDisplay,
  PageContainer,
  FiltersContainer,
} from './styles';

type FilterType = {
  remote: string;
  role: string;
  distance: string;
  countries: string[];
  languages: string[];
};

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();
  const [caseInfo, setCaseInfo] = useState<CaseListing>();
  const [caseFilters, setCaseFilters] = useState<FilterType>({
    remote: 'Remote/In Person',
    role: 'Attorney/Interpreter',
    distance: 'Anywhere',
    countries: ['All countries'],
    languages: ['All languages'],
  });

  // load cases on render
  useEffect(() => {
    getNCases(20).then(casesData => {
      setCaseData(casesData);
      setCaseInfo(casesData[0]);
    });
  }, []);

  return (
    <PageContainer>
      <H1>Browse Available Cases</H1>
      <FiltersContainer>
        <ButtonDropdown
          defaultValue="Remote/In Person"
          options={['Remote/In Person', 'Remote Only', 'In Person Only']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, remote: v as string })
          }
        />
        <ButtonDropdown
          defaultValue="Attorney/Interpreter"
          options={['Attorney/Interpreter', 'Interpreter Only']}
          onChange={v => setCaseFilters({ ...caseFilters, role: v as string })}
        />
        <ButtonDropdown
          defaultValue="Anywhere"
          // requires knowing user location
          options={[
            'Within 5 miles',
            'Within 10 miles',
            'Within 20 miles',
            'Within 100 miles',
            'Anywhere',
          ]}
          onChange={v =>
            setCaseFilters({ ...caseFilters, distance: v as string })
          }
        />
        <ButtonDropdown
          defaultValue="All countries"
          multi
          options={[
            'All countries',
            ...Array.from(
              new Set(
                caseData
                  .filter(c => c.country)
                  .map(c => (c.country ? c.country : '')),
              ),
            ),
          ]}
          onChange={v =>
            setCaseFilters({ ...caseFilters, countries: v as string[] })
          }
        />
        <ButtonDropdown
          defaultValue="All languages"
          multi
          // better solution available if we update ts target to es6
          options={['All languages'].concat(
            caseData
              .flatMap(c => c.languages)
              .filter((v, i, arr) => arr.indexOf(v) === i),
          )}
          onChange={v =>
            setCaseFilters({ ...caseFilters, languages: v as string[] })
          }
        />
      </FiltersContainer>
      <MainDisplay>
        <CardColumn>
          {caseData
            .filter(c => {
              if (caseFilters.remote === 'remote') return c.is_remote;
              if (caseFilters.remote === 'inperson') return !c.is_remote;
              return true;
            })
            .filter(c =>
              caseFilters.role === 'both' ? true : c.needs_interpreter,
            )
            .filter(c =>
              caseFilters.countries[0] === 'All countries'
                ? true
                : c.country && caseFilters.countries.includes(c.country),
            )
            .map(c => (
              <ListingCard
                key={c.id}
                caseData={c}
                isSelected={c.id === selectedCard}
                onClick={() => {
                  setSelectedCard(c.id);
                  setCaseInfo(c);
                }}
              />
            ))}
        </CardColumn>
        {caseInfo && <CaseDetailDisplay caseData={caseInfo} />}
      </MainDisplay>
    </PageContainer>
  );
}
