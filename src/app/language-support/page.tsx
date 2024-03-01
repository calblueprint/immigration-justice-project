'use client';

import { getAllLanguageSupport } from '@/api/supabase/queries/language-support';
import { useEffect, useState } from 'react';
import { LanguageSupport } from '@/types/schema';

export default function Page() {
  const [languageSupport, setLanguageSupport] = useState<LanguageSupport[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLanguageSupport();
        setLanguageSupport(data as LanguageSupport[]);
      } catch (error) {
        console.error('(useEffect)[LanguageSupport]', error);
      }
    };
    fetchData();
  }, []);

  const getIsRemoteValue = (isRemote: boolean | undefined) => {
    let isRemoteDisplay;
    switch (isRemote) {
      case true:
        isRemoteDisplay = 'true';
        break;
      case false:
        isRemoteDisplay = 'false';
        break;
      default:
        isRemoteDisplay = 'null';
    }
    return isRemoteDisplay;
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
            <th>language</th>
            <th>num_pages</th>
          </tr>
        </thead>
        <tbody>
          {languageSupport.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.title || 'null'}</td>
              <td>{l.summary || 'null'}</td>
              <td>{getIsRemoteValue(l.is_remote)}</td>
              <td>{l.deadline}</td>
              <td>{l.language}</td>
              <td>{l.num_pages || 'null'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
