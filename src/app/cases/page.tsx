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
  agency: string;
  languages: string[];
  countries: string[];
};

const defaultFilterValues = {
  remote: 'Remote/In Person',
  role: 'Roles needed',
  agency: 'Adjudicating agency',
  languages: 'Languages',
  countries: 'Country of origin',
};

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();
  const [caseInfo, setCaseInfo] = useState<CaseListing>();
  const [caseFilters, setCaseFilters] = useState<FilterType>({
    remote: 'Remote/In Person',
    role: 'Roles needed',
    agency: 'Adjudicating agency',
    languages: ['Languages'],
    countries: ['Country of origin'],
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
          defaultValue={defaultFilterValues.remote}
          options={[defaultFilterValues.remote, 'Remote', 'In Person']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, remote: v as string })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.role}
          options={[defaultFilterValues.role, 'Interpreter only']}
          onChange={v => setCaseFilters({ ...caseFilters, role: v as string })}
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.languages}
          multi
          // better solution available if we update ts target to es6
          options={[defaultFilterValues.languages].concat(
            caseData
              .flatMap(c => c.languages)
              .filter((v, i, arr) => arr.indexOf(v) === i),
          )}
          onChange={v =>
            setCaseFilters({ ...caseFilters, languages: v as string[] })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.agency}
          options={[defaultFilterValues.agency, 'Court', 'USCIS']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, agency: v as string })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.countries}
          multi
          // better solution available if we update ts target to es6
          options={[defaultFilterValues.countries].concat(
            caseData
              .map(c => c.country)
              .filter((v, i, arr) => arr.indexOf(v) === i),
          )}
          onChange={v =>
            setCaseFilters({ ...caseFilters, countries: v as string[] })
          }
        />
      </FiltersContainer>
      <MainDisplay>
        <CardColumn>
          {caseData
            .filter(c => {
              if (caseFilters.remote === 'Remote') return c.is_remote;
              if (caseFilters.remote === 'In Person') return !c.is_remote;
              return true;
            })
            .filter(c =>
              caseFilters.role === 'both' ? true : c.needs_interpreter,
            )
            .filter(c =>
              caseFilters.countries[0] === defaultFilterValues.countries
                ? true
                : caseFilters.countries.includes(c.country),
            )
            .filter(c =>
              caseFilters.languages[0] === defaultFilterValues.languages
                ? true
                : caseFilters.languages.find(l => c.languages.includes(l)),
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
