'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard';
import CaseDetails from '@/components/CaseDetails';
import { H2 } from '@/styles/text';
import { ProfileContext } from '@/utils/ProfileProvider';
import ProfileButton from '@/components/ProfileButton';
import { LinkButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import FilterDropdown from '@/components/FilterDropdown';
import { parseAgency } from '@/utils/helpers';
import {
  CardColumn,
  PageContainer,
  FiltersContainer,
  Body,
  CaseDetailsContainer,
  AuthButtons,
  Header,
  ResetFilters,
  ListingCount,
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
  const profile = useContext(ProfileContext);
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

  const filteredCases = useMemo(
    () =>
      caseData
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
        ),
    [caseData, caseFilters],
  );

  // load cases on render
  useEffect(() => {
    getNCases(20).then(casesData => {
      setCaseData(casesData as CaseListing[]);
      setCaseInfo(casesData[0] as CaseListing);
    });
  }, []);

  const AuthButtonView = useMemo(() => {
    if (profile && profile.userId)
      return profile.profileData ? (
        <ProfileButton href="/settings">
          {profile.profileData.first_name}
        </ProfileButton>
      ) : (
        <LinkButton
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          href="/onboarding/roles"
        >
          Go to Onboarding
        </LinkButton>
      );

    return (
      <>
        <LinkButton $secondaryColor={COLORS.blueMid} href="/signup">
          Sign Up
        </LinkButton>
        <LinkButton
          $primaryColor={COLORS.blueMid}
          $secondaryColor={COLORS.blueDark}
          href="/login"
        >
          Log In
        </LinkButton>
      </>
    );
  }, [profile]);

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
      <Header>
        <H2>Browse Available Cases</H2>
        <FiltersContainer>
          <FilterDropdown
            placeholder={defaultFilterValues.remote}
            multi
            options={new Set(['Remote', 'In Person'])}
            value={caseFilters.remote}
            fullText="All Remote/In Person"
            onChange={v => setCaseFilters({ ...caseFilters, remote: v })}
          />
          <FilterDropdown
            placeholder={defaultFilterValues.role}
            multi
            options={new Set(['Interpreter', 'Attorney'])}
            value={caseFilters.role}
            fullText="All Interpreter/Attorney"
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
          <ResetFilters onClick={() => resetFilters()}>
            Reset Filters
          </ResetFilters>
          <AuthButtons>{AuthButtonView}</AuthButtons>
        </FiltersContainer>
      </Header>
      <Body>
        <ListingCount $color={COLORS.greyMid}>
          {filteredCases.length} listings found
        </ListingCount>
        <CardColumn>
          {filteredCases.map(c => (
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
        <CaseDetailsContainer>
          {caseInfo && <CaseDetails caseData={caseInfo} />}
        </CaseDetailsContainer>
      </Body>
    </PageContainer>
  );
}
