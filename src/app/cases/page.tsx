'use client';

import { UUID } from 'crypto';
import { getNCases } from '@/api/supabase/queries/cases';
import { LinkButton } from '@/components/Button';
import FilterDropdown from '@/components/FilterDropdown';
import ListingCard from '@/components/ListingCard';
import ListingDetails from '@/components/ListingDetails';
import ProfileButton from '@/components/ProfileButton';
import COLORS from '@/styles/colors';
import { CenteredH3, H1, H2 } from '@/styles/text';
import { CaseListing } from '@/types/schema';
import { parseAgency } from '@/utils/helpers';
import { ProfileContext } from '@/utils/ProfileProvider';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthButtons,
  Body,
  CardColumn,
  CaseDetailsContainer,
  FiltersContainer,
  Header,
  ListingCount,
  NoCasesContainer,
  PageContainer,
  ResetFilters,
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
  const [selectedCard, setSelecatedCard] = useState<UUID | null>(null);
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [caseInfo, setCaseInfo] = useState<CaseListing>();
  const [caseFilters, setCaseFilters] = useState<FilterType>({
    remote: new Set(),
    role: new Set(),
    agency: new Set(),
    languages: new Set(),
    countries: new Set(),
  });

  const remoteOptions = useMemo(() => new Set(['Remote', 'In Person']), []);
  const roleOptions = useMemo(() => new Set(['Attorney', 'Interpreter']), []);
  const agencyOptions: Map<string, string> = useMemo(
    () =>
      new Map(
        caseData
          .filter(c => c.adjudicating_agency)
          .map(c => [
            c.adjudicating_agency ?? '',
            c.adjudicating_agency ? parseAgency(c.adjudicating_agency) : '',
          ]),
      ),
    [caseData],
  );
  const languageOptions = useMemo(
    () => new Set(caseData.flatMap(c => c.languages)),
    [caseData],
  );
  const countryOptions = useMemo(
    () => new Set(caseData.map(c => c.country).filter(c => c)) as Set<string>,
    [caseData],
  );

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
            caseFilters.languages.size === 0 ||
            c.languages.find(l => caseFilters.languages.has(l)),
        )
        .filter(
          c =>
            caseFilters.agency.size === 0 ||
            (c.adjudicating_agency &&
              caseFilters.agency.has(c.adjudicating_agency)),
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
      setSelecatedCard(casesData[0]?.id);
    });
  }, []);

  const AuthButtonView = useMemo(() => {
    if (profile?.profileReady)
      return (
        <ProfileButton href="/settings">
          {profile.profileData?.first_name || 'Profile'}
        </ProfileButton>
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
            options={remoteOptions}
            value={caseFilters.remote}
            fullText="Remote, In Person"
            onChange={v => setCaseFilters({ ...caseFilters, remote: v })}
          />
          <FilterDropdown
            placeholder={defaultFilterValues.role}
            multi
            options={roleOptions}
            value={caseFilters.role}
            fullText="Attorney, Interpreter"
            onChange={v => setCaseFilters({ ...caseFilters, role: v })}
          />
          <FilterDropdown
            placeholder={defaultFilterValues.languages}
            multi
            options={languageOptions}
            value={caseFilters.languages}
            onChange={v => setCaseFilters({ ...caseFilters, languages: v })}
          />
          <FilterDropdown
            placeholder={defaultFilterValues.agency}
            multi
            options={agencyOptions}
            value={caseFilters.agency}
            onChange={v => setCaseFilters({ ...caseFilters, agency: v })}
          />
          <FilterDropdown
            placeholder={defaultFilterValues.countries}
            multi
            options={countryOptions}
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
        <CardColumn>
          <ListingCount $color={COLORS.greyMid}>
            {filteredCases.length} listings found
          </ListingCount>
          {filteredCases.length === 0 ? (
            <CenteredH3 $color={COLORS.greyMid}>No cases listed</CenteredH3>
          ) : (
            <>
              {filteredCases.map(c => (
                <ListingCard
                  key={c.id}
                  listing={c}
                  isSelected={c.id === selectedCard}
                  onClick={() => {
                    setSelecatedCard(c.id);
                    setCaseInfo(c);
                  }}
                />
              ))}
            </>
          )}
        </CardColumn>
        <CaseDetailsContainer>
          {caseInfo ? (
            <ListingDetails listingData={caseInfo} />
          ) : (
            <NoCasesContainer>
              <H1 $color={COLORS.greyMid}>No cases listed</H1>
              <CenteredH3 $color={COLORS.greyMid}>
                Check back later for more cases
              </CenteredH3>
            </NoCasesContainer>
          )}
        </CaseDetailsContainer>
      </Body>
    </PageContainer>
  );
}
