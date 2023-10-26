'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import FilterDropdown from '@/components/FilterDropdown';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard';
import CaseDetailDisplay from '@/components/CaseDetails';
import { H1 } from '@/styles/text';
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

  // react hooks
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
        <FilterDropdown
          defaultValue="Remote/In Person"
          options={['Remote/In Person', 'Remote Only', 'In Person Only']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, remote: v as string })
          }
        />
        <FilterDropdown
          defaultValue="Attorney/Interpreter"
          options={['Attorney/Interpreter', 'Interpreter Only']}
          onChange={v => setCaseFilters({ ...caseFilters, role: v as string })}
        />
        <FilterDropdown
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
        <FilterDropdown
          defaultValue="All countries"
          multi
          // better solution available if we update ts target to es6
          options={['All countries'].concat(
            caseData
              .map(c => c.country)
              .filter((v, i, arr) => arr.indexOf(v) === i),
          )}
          onChange={v =>
            setCaseFilters({ ...caseFilters, countries: v as string[] })
          }
        />
        {/* <FilterDropdown
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
        /> */}
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
                : caseFilters.countries.includes(c.country),
            )
            // .filter(c =>
            //   caseFilters.languages[0] === 'All languages'
            //     ? true
            //     : caseFilters.languages.find(l => c.languages.includes(l)),
            // )
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
