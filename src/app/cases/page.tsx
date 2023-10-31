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
  remote: Set<string>;
  role: Set<string>;
  agency: Set<string>;
  languages: Set<string>;
  countries: Set<string>;
};

const defaultFilterValues = {
  remote: 'Remote/In Person',
  role: 'Roles needed',
  languages: 'Languages',
  agency: 'Adjudicating Agency',
  countries: 'Country of Origin',
};

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [selectedCard, setSelectedCard] = useState<UUID>();
  const [caseInfo, setCaseInfo] = useState<CaseListing>();
  const [caseFilters, setCaseFilters] = useState<FilterType>({
    remote: new Set(),
    role: new Set(),
    agency: new Set(),
    languages: new Set(),
    countries: new Set(),
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
          multi
          options={['Remote', 'In Person']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, remote: v as Set<string> })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.role}
          multi
          options={['Interpreter', 'Attorney']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, role: v as Set<string> })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.languages}
          multi
          // better solution available if we update ts target to es6
          options={caseData
            .flatMap(c => c.languages)
            .filter((v, i, arr) => arr.indexOf(v) === i)}
          onChange={v =>
            setCaseFilters({ ...caseFilters, languages: v as Set<string> })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.agency}
          multi
          options={['Court', 'USCIS']}
          onChange={v =>
            setCaseFilters({ ...caseFilters, agency: v as Set<string> })
          }
        />
        <ButtonDropdown
          defaultValue={defaultFilterValues.countries}
          multi
          // better solution available if we update ts target to es6
          options={caseData
            .map(c => c.country)
            .filter((v, i, arr) => arr.indexOf(v) === i)}
          onChange={v =>
            setCaseFilters({ ...caseFilters, countries: v as Set<string> })
          }
        />
      </FiltersContainer>
      <MainDisplay>
        <CardColumn>
          {caseData
            .filter(c => {
              if (caseFilters.remote.size === 0) return true;
              if (caseFilters.remote.has('Remote') && c.is_remote) return true;
              if (caseFilters.remote.has('In Person') && !c.is_remote)
                return true;
              return false;
            })
            .filter(c => {
              if (caseFilters.role.size === 0) return true;
              if (caseFilters.role.has('Interpreter') && c.needs_interpreter)
                return true;
              if (caseFilters.role.has('Attorney') && c.needs_attorney)
                return true;
              return false;
            })
            // await schema change
            // .filter(c =>
            //   caseFilters.countries.size > 0
            //     ? c.countries.find(co => caseFilters.countries.has(co))
            //     : true,
            // )
            .filter(c =>
              caseFilters.languages.size > 0
                ? c.languages.find(l => caseFilters.languages.has(l))
                : true,
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
