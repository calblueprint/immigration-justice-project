'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllCases } from '@/api/supabase/queries/cases';
import { getAllDocuments } from '@/api/supabase/queries/documentTranslation';
import { getAllInterpretation } from '@/api/supabase/queries/interpretation';
import ListingPage from '@/components/ListingPage';
import { LanguageSupport, Listing } from '@/types/schema';
import { timestampStringToDate } from '@/utils/helpers';

const typeOptions = new Map([
  ['DOC', 'Document Translation'],
  ['INT', 'One-time Interpretation'],
  ['CASE', 'Case Interpretation'],
]);

export default function Page() {
  const [lsData, setLSData] = useState<LanguageSupport[]>([]);
  const [typeFilters, setTypeFilters] = useState(new Set<string>());
  const [languageFilters, setLanguageFilters] = useState(new Set<string>());
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // load language support on first render
  useEffect(() => {
    (async () => {
      try {
        const [docListings, intListings, casesInterpretationListings] =
          await Promise.all([
            getAllDocuments(),
            getAllInterpretation(),
            getAllCases(),
          ]);

        const sortedLS = [...docListings, ...intListings].sort(
          (a, b) =>
            timestampStringToDate(b.upload_date).getTime() -
            timestampStringToDate(a.upload_date).getTime(),
        );

        const lsDataToSet = [
          ...casesInterpretationListings.filter(
            caseInterpretation => caseInterpretation.needs_interpreter === true,
          ),
          ...sortedLS,
        ];

        setLSData(lsDataToSet);
        setSelectedListing(lsDataToSet[0]);
      } catch (error) {
        console.error('(useEffect)[LanguageSupport]', error);
      }
    })();
  }, []);

  const languageOptions = useMemo(
    () => new Set(lsData.flatMap(ls => ls.languages)),
    [lsData],
  );

  const filteredLS = useMemo(
    () =>
      lsData
        .filter(
          ls => typeFilters.size === 0 || typeFilters.has(ls.listing_type),
        )
        .filter(
          ls =>
            languageFilters.size === 0 ||
            ls.languages.find(l => languageFilters.has(l)),
        ),
    [lsData, typeFilters, languageFilters],
  );

  const resetFilters = useCallback(() => {
    setTypeFilters(new Set());
    setLanguageFilters(new Set());
  }, []);

  return (
    <ListingPage
      filters={[
        {
          id: 'type',
          options: typeOptions,
          value: typeFilters,
          onChange: newValue => setTypeFilters(newValue),
          placeholder: 'Interpretation Type',
        },
        {
          id: 'languages',
          options: languageOptions,
          value: languageFilters,
          onChange: newValue => setLanguageFilters(newValue),
          placeholder: 'Language(s)',
        },
      ]}
      filteredListings={filteredLS}
      resetFilters={resetFilters}
      selectedListing={selectedListing}
      setSelectedListing={listing => setSelectedListing(listing)}
      interpretation
    />
  );
}
