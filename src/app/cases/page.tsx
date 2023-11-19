'use client';

import { useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard';
import { AColored, H1 } from '@/styles/text';
import CaseDetails from '@/components/CaseDetails';
import FilterDropdown from '@/components/FilterDropdown';
import { parseAgency } from '@/utils/helpers';
import COLORS from '@/styles/colors';
import {
  CardColumn,
  MainDisplay,
  PageContainer,
  FiltersContainer,
  CaseDetailDisplay,
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

  const resetFilters = () => {
    setCaseFilters({
      remote: new Set(),
      role: new Set(),
      agency: new Set(),
      languages: new Set(),
      countries: new Set(),
    });
  };

  return (
    <PageContainer>
      <H1>Browse Available Cases</H1>
      <FiltersContainer>
        <FilterDropdown
          placeholder={defaultFilterValues.remote}
          multi
          options={new Set(['Remote', 'In Person'])}
          value={caseFilters.remote}
          onChange={v => setCaseFilters({ ...caseFilters, remote: v })}
        />
        <FilterDropdown
          placeholder={defaultFilterValues.role}
          multi
          options={new Set(['Interpreter', 'Attorney'])}
          value={caseFilters.role}
          onChange={v => setCaseFilters({ ...caseFilters, role: v })}
        />
        {/* languages dropdown to implement later */}
        <FilterDropdown
          placeholder={defaultFilterValues.agency}
          multi
          options={
            new Map(
              caseData.map(c => [
                c.adjudicating_agency,
                parseAgency(c.adjudicating_agency),
              ]),
            )
          }
          value={caseFilters.agency}
          onChange={v => setCaseFilters({ ...caseFilters, agency: v })}
        />
        <FilterDropdown
          placeholder={defaultFilterValues.countries}
          multi
          options={
            new Set(
              caseData.filter(c => c.country).map(c => c.country),
            ) as Set<string>
          }
          value={caseFilters.countries}
          onChange={v => setCaseFilters({ ...caseFilters, countries: v })}
        />
        <AColored onClick={() => resetFilters()} $color={COLORS.greyMid}>
          Reset Filters
        </AColored>
      </FiltersContainer>
      <MainDisplay>
        <CardColumn>
          {caseData
            .filter(
              c =>
                caseFilters.remote.size === 0 ||
                (caseFilters.remote.has('Remote') && c.is_remote) ||
                (caseFilters.remote.has('In Person') && !c.is_remote),
            )
            .filter(
              c =>
                caseFilters.role.size === 0 ||
                (caseFilters.role.has('Interpreter') && c.needs_interpreter) ||
                (caseFilters.role.has('Attorney') && c.needs_attorney),
            )
            .filter(
              c =>
                caseFilters.agency.size === 0 ||
                caseFilters.agency.has(c.adjudicating_agency),
            )
            .filter(c =>
              caseFilters.countries.size > 0
                ? c.country && caseFilters.countries.has(c.country)
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
        {caseInfo && (
          <CaseDetailDisplay>
            <CaseDetails caseData={caseInfo} />
          </CaseDetailDisplay>
        )}
      </MainDisplay>
    </PageContainer>
  );
}
