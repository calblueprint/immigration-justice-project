'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { UUID } from 'crypto';
import { CaseListing } from '@/types/schema';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingCard from '@/components/ListingCard';
import CaseDetails from '@/components/CaseDetails';
import { H1, H2 } from '@/styles/text';
import { ProfileContext } from '@/utils/ProfileProvider';
import ProfileButton from '@/components/ProfileButton';
import { LinkButton } from '@/components/Button';
import COLORS from '@/styles/colors';
import FilterDropdown from '@/components/FilterDropdown';
import {
  CardColumn,
  PageContainer,
  FiltersContainer,
  Body,
  CaseDetailsContainer,
  AuthButtons,
  Header,
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

  return (
    <PageContainer>
      <Header>
        <H2>Browse Available Cases</H2>
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
            onChange={v =>
              setCaseFilters({ ...caseFilters, role: v as string })
            }
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
          <AuthButtons>{AuthButtonView}</AuthButtons>
        </FiltersContainer>
      </Header>
      <Body>
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
        <CaseDetailsContainer>
          {caseInfo && <CaseDetails caseData={caseInfo} />}
        </CaseDetailsContainer>
      </Body>
    </PageContainer>
  );
}
