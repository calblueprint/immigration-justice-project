'use client'
import { getAllLanguageSupport } from '@/api/supabase/queries/language-support';
import { useEffect, useState } from 'react';
import { LanguageSupport } from '@/types/schema';

// test 
import { CaseListing } from '@/types/schema';
import { getNCases } from '@/api/supabase/queries/cases';

export default function Page() {
  const [languageSupport, setLanguageSupport] = useState<LanguageSupport[]>([]);
  // test 
  const [cases, setCases] = useState<CaseListing[]>([]);
  
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const cases = await getNCases(5);
        setCases(cases as CaseListing[]);
      } catch (error) {
        console.error('(useEffect)[Cases]', error);
      }
    };
    const fetchData = async () => {
      try {
        const languageSupport = await getAllLanguageSupport();
        setLanguageSupport(languageSupport as LanguageSupport[]);
      } catch (error) {
        console.error('(useEffect)[LanguageSupport]', error);
      }
    };
    fetchData();
    fetchCases()
    // getAllLanguageSupport().then(d => {
    //   setData(d as LanguageSupport[])
    // })
  }, [])

  return (
  <div> 
    {/* <p>{cases.length > 1? "data exists" : "doesn't exist"}</p> */}
    {languageSupport.length}
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
      {/* <tr>
        <td>{languageSupport[0].id}</td>
        <td>{languageSupport[0].title}</td>
        <td>{languageSupport[0].summary}</td>
        <td>{languageSupport[0].is_remote}</td>
        <td>{languageSupport[0].deadline}</td>
        <td>{languageSupport[0].language}</td>     
      </tr> */}
    {languageSupport.map((l) => (
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
  )
}