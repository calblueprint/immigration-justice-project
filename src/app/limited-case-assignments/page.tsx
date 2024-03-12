'use client';

import { useEffect, useState } from 'react';
import { LimitedCaseAssignment } from '@/types/schema';
import { getAllLCAListings } from '../../api/supabase/queries/limited-case-assignments';

export default function Page() {
  const [data, setData] = useState<LimitedCaseAssignment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LCAData = await getAllLCAListings();
        setData(LCAData);
      } catch (error) {
        console.error('(useEffect)[LCA]', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Limited Case Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Listing ID</th>
            <th>Language Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
