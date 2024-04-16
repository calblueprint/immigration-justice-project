'use client';

import { useEffect, useState } from 'react';
import { getAllCases } from '@/api/supabase/queries/cases';
import { getAllDocuments } from '@/api/supabase/queries/documentTranslation';
import { getAllInterpretation } from '@/api/supabase/queries/interpretation';
import { AllLanguageSupport } from '@/types/schema';
import { timestampStringToDate } from '@/utils/helpers';

export default function Page() {
  const [allLanguageSupport, setAllLanguageSupport] = useState<
    AllLanguageSupport[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
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
        setAllLanguageSupport([
          ...casesInterpretationListings.filter(
            caseInterpretation => caseInterpretation.needs_interpreter === true,
          ),
          ...sortedLS,
        ]);
      } catch (error) {
        console.error('(useEffect)[LanguageSupport]', error);
      }
    };

    fetchData();
  }, []);

  const getIsRemoteValue = (isRemote: boolean | undefined) => {
    if (isRemote === true) {
      return 'true';
    }
    if (isRemote === false) {
      return 'false';
    }
    return 'null';
  };

  const allLangSupportRow = (ls: AllLanguageSupport) => {
    if (ls.listing_type === 'INT') {
      return (
        <tr key={ls.id}>
          <td>{ls.id}</td>
          <td>{ls.title}</td>
          <td>{ls.summary}</td>
          <td>{ls.languages.join(', ')}</td>
          <td>{getIsRemoteValue(ls.is_remote)}</td>
          <td>{ls.listing_type}</td>
          <td>N/A</td>
          <td>{ls.upload_date}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      );
    }
    if (ls.listing_type === 'DOC') {
      return (
        <tr key={ls.id}>
          <td>{ls.id}</td>
          <td>{ls.title}</td>
          <td>{ls.summary}</td>
          <td>{ls.languages.join(', ')}</td>
          <td>Asynchronous</td>
          <td>{ls.listing_type}</td>
          <td>{ls.deadline}</td>
          <td>{ls.upload_date}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>{ls.num_pages}</td>
        </tr>
      );
    }
    return (
      <tr key={ls.id}>
        <td>{ls.id}</td>
        <td>{ls.title}</td>
        <td>{ls.summary}</td>
        <td>{ls.languages.join(', ')}</td>
        <td>{getIsRemoteValue(ls.is_remote)}</td>
        <td>Case Interpretation</td>
        <td>N/A</td>
        <td>{ls.upcoming_date}</td>
        <td>{ls.num_weeks}</td>
        <td>{ls.hours_per_week}</td>
        <td>N/A</td>
      </tr>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>summary</th>
            <th>language</th>
            <th>is_remote</th>
            <th>listing_type</th>
            <th>deadline</th>
            <th>upcoming_date</th>
            <th>num_weeks</th>
            <th>hours_per_week</th>
            <th>num_pages</th>
          </tr>
        </thead>
        <tbody>{allLanguageSupport.map(l => allLangSupportRow(l))}</tbody>
      </table>
    </div>
  );
}
