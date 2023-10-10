'use client';

import { useEffect, useState } from 'react';
import { getAllCases } from '../../api/supabase/queries/cases';
import { CaseListing } from '../../types/schemaTypes';

export default function Page() {
  const [data, setData] = useState<CaseListing[]>([]);

  useEffect(() => {
    getAllCases().then(casesData => {
      setData(casesData);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>summary</th>
            <th>languages</th>
            <th>country</th>
            <th>legalServerId</th>
            <th>clientInitials</th>
            <th>timeToComplete</th>
            <th>isRemote</th>
            <th>clientLocation</th>
            <th>program</th>
            <th>upcomingHearingDate</th>
            <th>needsInterpreter</th>
            <th>interestIds</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.summary}</td>
              <td>{JSON.stringify(d.languages)}</td>
              <td>{d.country}</td>
              <td>{d.legal_server_id}</td>
              <td>{d.client_initials}</td>
              <td>{d.time_to_complete}</td>
              <td>{d.is_remote}</td>
              <td>{d.client_location}</td>
              <td>{d.program}</td>
              <td>{d.upcoming_hearing_date}</td>
              <td>{JSON.stringify(d.needs_interpreter)}</td>
              <td>{JSON.stringify(d.interest_ids)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
