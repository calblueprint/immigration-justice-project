'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllCases } from '@/api/supabase/queries/cases';
import ListingPage from '@/components/ListingPage';
import { CaseListing, Listing } from '@/types/schema';
import { parseAgency } from '@/utils/helpers';

const remoteOptions = new Set(['Remote', 'In Person']);

export default function Page() {
  const [caseData, setCaseData] = useState<CaseListing[]>([]);
  const [remoteFilters, setRemoteFilters] = useState(new Set<string>());
  const [agencyFilters, setAgencyFilters] = useState(new Set<string>());
  const [languagesFilters, setLanguagesFilters] = useState(new Set<string>());
  const [countriesFilters, setCountriesFilters] = useState(new Set<string>());
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // load cases on first render
  useEffect(() => {
    (async () => {
      try {
        const cases = await getAllCases();
        setCaseData(cases);
        if (cases.length > 0) setSelectedListing(cases[0]);
      } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
      }
    })();
  }, []);

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
    () => new Set(caseData.map(c => c.country || '').filter(c => c)),
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
        .filter(
          c =>
            countriesFilters.size === 0 ||
            (c.country && countriesFilters.has(c.country)),
        ),
    [
      caseData,
      remoteFilters,
      languagesFilters,
      agencyFilters,
      countriesFilters,
    ],
  );

  useEffect(() => {
    setSelectedListing(filteredCases.length > 0 ? filteredCases[0] : null);
  }, [filteredCases]);

  const resetFilters = useCallback(() => {
    setRemoteFilters(new Set());
    setAgencyFilters(new Set());
    setLanguagesFilters(new Set());
    setCountriesFilters(new Set());
  }, []);

  return (
    <ListingPage
      filters={[
        {
          id: 'remote/in-person',
          fullText: 'Remote, In Person',
          options: remoteOptions,
          value: remoteFilters,
          onChange: newValue => setRemoteFilters(newValue),
          placeholder: 'Remote/In Person',
        },
        {
          id: 'languages',
          options: languageOptions,
          value: languagesFilters,
          onChange: newValue => setLanguagesFilters(newValue),
          placeholder: 'Languages',
        },
        {
          id: 'adjudicating-agency',
          options: agencyOptions,
          value: agencyFilters,
          onChange: newValue => setAgencyFilters(newValue),
          placeholder: 'Adjudicating Agency',
        },
        {
          id: 'countries',
          options: countryOptions,
          value: countriesFilters,
          onChange: newValue => setCountriesFilters(newValue),
          placeholder: 'Country of Origin',
        },
      ]}
      filteredListings={filteredCases}
      resetFilters={resetFilters}
      selectedListing={selectedListing}
      setSelectedListing={listing => setSelectedListing(listing)}
    />
  );
}
