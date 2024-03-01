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

  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>summary</th>
          <th>is_remote</th>
          <th>deadline</th>
          <th>language</th>
          <th>num_pages</th>
        </tr>
        {languageSupport.map(l => (
          <tr key={l.id}>
            <td>{l.id}</td>
            <td>{l.title}</td>
            <td>{l.summary}</td>
            <td>{l.is_remote}</td>
            <td>{l.deadline}</td>
            <td>{l.language}</td>
            <td>{l.num_pages}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
