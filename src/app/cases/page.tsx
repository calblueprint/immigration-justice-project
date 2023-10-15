'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schemaTypes';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard/ListingCard';
import { H1, H2 } from '@/styles/text';
import SingleSelectFilter from '@/components/FilterDropdown/SingleSelectFilter';
import {
  CardColumn,
  CaseDetailDisplay,
  CaseDetails,
  FiltersContainer,
  MainDisplay,
  PageContainer,
} from './styles';

type FilterType = {
  remote: string;
  role: string;
  distance: string;
  countries: string; // turn to string[] when we have multi-select
  language: string; // turn to string[] when we have multi-select
};

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();
  const [caseFilters, setCaseFilters] = useState<FilterType>({
    remote: 'any',
    role: 'both',
    distance: 'any',
    countries: 'all',
    language: 'all',
  });

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
      <FiltersContainer>
        <SingleSelectFilter
          defaultValue="Remote/In Person"
          options={[
            { name: 'any', displayName: 'Remote/In Person' },
            { name: 'remote', displayName: 'Remote Only' },
            { name: 'inperson', displayName: 'In Person Only' },
          ]}
          onChange={name => setCaseFilters({ ...caseFilters, remote: name })}
        />
        <SingleSelectFilter
          defaultValue="Attorney/Interpreter"
          options={[
            { name: 'both', displayName: 'Attorney/Interpreter' },
            { name: 'interpreter', displayName: 'Interpreter Only' },
          ]}
          onChange={name => setCaseFilters({ ...caseFilters, role: name })}
        />
        <SingleSelectFilter
          defaultValue="Anywhere"
          // requires knowing user location
          options={[
            { name: 'mile5', displayName: 'Within 5 miles' },
            { name: 'mile10', displayName: 'Within 10 miles' },
            { name: 'mile20', displayName: 'Within 20 miles' },
            { name: 'mile50', displayName: 'Within 50 miles' },
            { name: 'mile100', displayName: 'Within 100 miles' },
            { name: 'any', displayName: 'Anywhere' },
          ]}
          onChange={name => setCaseFilters({ ...caseFilters, distance: name })}
        />
        <SingleSelectFilter
          defaultValue="All countries"
          // better solution available if we update ts target to es6
          options={[{ name: 'all', displayName: 'All countries' }].concat(
            caseData
              .map(c => c.country)
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .map(c => ({ name: c, displayName: c })),
          )}
          onChange={name => setCaseFilters({ ...caseFilters, countries: name })}
        />
        <SingleSelectFilter
          defaultValue="All languages"
          // better solution available if we update ts target to es6
          options={[{ name: 'all', displayName: 'All languages' }].concat(
            caseData
              .flatMap(c => c.languages)
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .map(c => ({ name: c, displayName: c })),
          )}
          onChange={name => setCaseFilters({ ...caseFilters, language: name })}
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
              caseFilters.countries === 'all'
                ? true
                : c.country === caseFilters.countries,
            )
            .filter(c =>
              caseFilters.language === 'all'
                ? true
                : c.languages.includes(caseFilters.language),
            )
            .map(c => (
              <ListingCard
                key={c.id}
                caseData={c}
                isSelected={c.id === selectedCard}
                onClick={() => setSelectedCard(c.id)}
              />
            ))}
        </CardColumn>
        <CaseDetailDisplay>
          {/* proof of concept -- to turn into component later */}
          <CaseDetails>
            <H2>Case details.</H2>
          </CaseDetails>
        </CaseDetailDisplay>
      </MainDisplay>
    </PageContainer>
  );
}
