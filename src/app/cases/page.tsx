'use client';

import { useEffect, useMemo, useState } from 'react';
import { getNCases } from '@/api/supabase/queries/cases';
import ListingPage from '@/components/ListingPage';
import { CaseListing } from '@/types/schema';
import { parseAgency } from '@/utils/helpers';

const defaultFilterValues = {
  remote: 'Remote/In Person',
  role: 'Roles needed',
  languages: 'Languages',
  agency: 'Adjudicating Agency',
  countries: 'Country of Origin',
};

const remoteOptions = new Set(['Remote', 'In Person']);

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [remoteFilters, setRemoteFilters] = useState(new Set<string>());
  const [agencyFilters, setAgencyFilters] = useState(new Set<string>());
  const [languagesFilters, setLanguagesFilters] = useState(new Set<string>());
  const [countriesFilters, setCountriesFilters] = useState(new Set<string>());

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
            remoteFilters.size === 0 ||
            (remoteFilters.has('Remote') && c.is_remote) ||
            (remoteFilters.has('In Person') && !c.is_remote),
        )
        .filter(
          c =>
            languagesFilters.size === 0 ||
            c.languages.find(l => languagesFilters.has(l)),
        )
        .filter(
          c =>
            agencyFilters.size === 0 ||
            (c.adjudicating_agency && agencyFilters.has(c.adjudicating_agency)),
        )
        .filter(c =>
          countriesFilters.size > 0
            ? c.country && countriesFilters.has(c.country)
            : true,
        ),
    [
      caseData,
      remoteFilters,
      languagesFilters,
      agencyFilters,
      countriesFilters,
    ],
  );

  // load cases on render
  useEffect(() => {
    getNCases(20).then(casesData => {
      setCaseData(casesData as CaseListing[]);
    });
  }, []);

  const resetFilters = () => {
    setRemoteFilters(new Set());
    setAgencyFilters(new Set());
    setLanguagesFilters(new Set());
    setCountriesFilters(new Set());
  };

  return (
    <ListingPage
      filters={[
        {
          id: 'remote/in-person',
          fullText: 'Remote, In Person',
          options: remoteOptions,
          value: remoteFilters,
          onChange: newValue => setRemoteFilters(newValue),
          placeholder: defaultFilterValues.remote,
        },
        {
          id: 'languages',
          options: languageOptions,
          value: languagesFilters,
          onChange: newValue => setLanguagesFilters(newValue),
          placeholder: defaultFilterValues.languages,
        },
        {
          id: 'adjudicating-agency',
          options: agencyOptions,
          value: agencyFilters,
          onChange: newValue => setAgencyFilters(newValue),
          placeholder: defaultFilterValues.agency,
        },
        {
          id: 'countries',
          options: countryOptions,
          value: countriesFilters,
          onChange: newValue => setCountriesFilters(newValue),
          placeholder: defaultFilterValues.countries,
        },
      ]}
      filteredListings={filteredCases}
      resetFilters={resetFilters}
      defaultListing={caseData[0]}
    />
  );
}
