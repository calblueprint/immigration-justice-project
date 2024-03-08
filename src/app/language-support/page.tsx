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

  console.log("allLanguageSupport length", allLanguageSupport.length) 
  console.log("languageSupport length", languageSupport.length) 

  const getIsRemoteValue = (isRemote: boolean | undefined) => {
    if (isRemote === true) {
      return 'true';
    }
    if (isRemote === false) {
      return 'false';
    }
    return 'null';
  };

  const isCaseInterpretation = (obj: AllLanguageSupport) => {
    return 'legal_server_id' in obj; 
  };

  const isNotCaseInterp = (obj: AllLanguageSupport) => {
    return 'listing_type' in obj; 
  };

  const allLangSupportRow = (langSupport: AllLanguageSupport) => {
    if (isCaseInterpretation(langSupport)) {
      let caseInterp = langSupport as CaseListing
      // console.log("Case Language Support Case")
      return (
        <tr key={caseInterp.legal_server_id}>
          <td>{caseInterp.legal_server_id}</td>
          <td>{caseInterp.title}</td>
          <td>{caseInterp.summary}</td>
          <td>{caseInterp.languages.join(', ')}</td>
          <td>{getIsRemoteValue(caseInterp.is_remote)}</td>
          <td>Case Interpretation</td>
          <td></td>
          <td>{caseInterp.upcoming_date}</td>
          <td>{caseInterp.num_months}</td>
          <td>{caseInterp.hours_per_month}</td>
          <td></td>
        </tr>
      )} 
    
      let ls = langSupport as LanguageSupport
      console.log("Non-Case Language Support Case")
      return (
        <tr key={ls.id}>
          <td>{ls.id}</td>
          <td>{ls.title}</td>
          <td>{ls.summary}</td>
          <td>{ls.language}</td>
          <td>{getIsRemoteValue(ls.is_remote)}</td>
          <td>{ls.listing_type}</td>
          <td>{ls.deadline}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{ls.num_pages}</td>
        </tr>
    )}

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
            <th>num_months</th>
            <th>hours_per_month</th>
            <th>num_pages</th>
          </tr>
        </thead>
        <tbody>
          {allLanguageSupport.map(l => 
            allLangSupportRow(l)
          )}
        </tbody>
      </table>
    </div>
  );
}

/*
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
      */