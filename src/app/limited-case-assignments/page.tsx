'use client';

import { useEffect, useState } from 'react';
import { getAllLCA } from '@/api/supabase/queries/limitedCaseAssignments';
import { LimitedCaseAssignment } from '@/types/schema';

/**
 * Fetches all LCA listings from the database
 * @returns HTML (unstyled) presenting all LCA objects
 */

export default function Page() {
  const [data, setData] = useState<LimitedCaseAssignment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const LCAData = await getAllLCA();
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
            <th>Title</th>
            <th>Languages</th>
            <th>Deadline</th>
            <th>Reserch Topic</th>
            <th>Summary</th>
            <th>Deliverable</th>
          </tr>
        </thead>
        <tbody>
          {data.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.title}</td>
              <td>{assignment.languages}</td>
              <td>{assignment.deadline}</td>
              <td>{assignment.research_topic}</td>
              <td>{assignment.summary}</td>
              <td>{assignment.deliverable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
