'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getNLCA } from '@/api/supabase/queries/limitedCaseAssignments';
import ListingPage from '@/components/ListingPage';
import { LimitedCaseAssignment } from '@/types/schema';

export default function Page() {
  const [lcaData, setLCAData] = useState<LimitedCaseAssignment[]>([]);
  const [countryFilters, setCountryFilters] = useState(new Set<string>());
  const [languageFilters, setLanguageFilters] = useState(new Set<string>());

  // load LCA on first render
  useEffect(() => {
    (async () => {
      try {
        const lcas = await getNLCA(20);
        setLCAData(lcas);
      } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
      }
    })();
  }, []);

  const countryOptions = useMemo(
    () => new Set(lcaData.map(lca => lca.country)),
    [lcaData],
  );
  const languageOptions = useMemo(
    () => new Set(lcaData.flatMap(lca => lca.languages)),
    [lcaData],
  );

  const filteredLCA = useMemo(
    () =>
      lcaData
        .filter(
          lca => countryFilters.size === 0 || countryFilters.has(lca.country),
        )
        .filter(
          lca =>
            languageFilters.size === 0 ||
            lca.languages.find(l => languageFilters.has(l)),
        ),
    [lcaData, countryFilters, languageFilters],
  );

  const resetFilters = useCallback(() => {
    setCountryFilters(new Set());
    setLanguageFilters(new Set());
  }, []);

  return (
    <ListingPage
      filters={[
        {
          id: 'countries',
          options: countryOptions,
          value: countryFilters,
          onChange: newValue => setCountryFilters(newValue),
          placeholder: 'Country',
        },
        {
          id: 'languages',
          options: languageOptions,
          value: languageFilters,
          onChange: newValue => setLanguageFilters(newValue),
          placeholder: 'Language(s)',
        },
      ]}
      filteredListings={filteredLCA}
      resetFilters={resetFilters}
      defaultListing={lcaData[0]}
    />
  );
}
