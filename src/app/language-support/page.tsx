'use client';

import { getAllInterpretation } from '@/api/supabase/queries/interpretation';
import { getAllDocuments } from '@/api/supabase/queries/documentTranslation';
import { useEffect, useState } from 'react';
import { DocumentTranslation, Interpretation } from '@/types/schema';

export default function Page() {
  const [docListings, setDocListings] = useState<DocumentTranslation[]>([]);
  const [intListings, setIntListings] = useState<Interpretation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getAllDocuments();
        const ints = await getAllInterpretation();
        setDocListings(docs);
        setIntListings(ints);
      } catch (error) {
        console.error('(useEffect)[LanguageSupport]', error);
      }

      // try {
      //   const data = await getCaseInterpretations();
      //   setCaseInterpretation(data);
      // } catch (error) {
      //   console.error('(useEffect)[CaseInterpretation]', error);
      // }
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

  const getLanguages = (languages: string[]) => {
    if (languages.length === 1) {
      return languages[0];
    } 
    var allLang = ""
    languages.forEach((lang) => {allLang = allLang + lang + ", "})
    return allLang.slice(0, -2);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>summary</th>
            <th>is_remote</th>
            <th>deadline</th>
            <th>languages</th>
            <th>num_pages</th>
            <th>listing_type</th>
          </tr>
        </thead>
        <tbody>
          {docListings.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.title || 'null'}</td>
              <td>{l.summary || 'null'}</td>
              <td>n/a</td>
              <td>{l.deadline}</td>
              <td>[{l.languages.join(', ')}]</td>
              <td>{l.num_pages || 'null'}</td>
            </tr>
          ))}
          {intListings.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.title || 'null'}</td>
              <td>{l.summary || 'null'}</td>
              <td>{getIsRemoteValue(l.is_remote)}</td>
              <td>n/a</td>
              <td>[{l.languages.join(', ')}]</td>
              <td>n/a</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
