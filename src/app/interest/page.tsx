'use client';

import { useState } from 'react';
import { UUID } from 'crypto';
import { insertInterest } from '../../api/supabase/queries/interest';
import { Interest } from '../../types/schemaTypes';
import styles from '../page.module.css';

export default function Interest() {
  const [reason, setReason] = useState<string>('');

  const handleInsert = async () => {
    if (reason !== '') {
      const newInterest: Interest = {
        // hardcoded values for now
        id: crypto.randomUUID() as UUID,
        listing_id: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
        listing_type: 'IJP6 Test',
        user_id: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
        form_response: {
          interestType: ['IJP-6-test'],
          interestReason: reason,
        },
      };
      await insertInterest(newInterest);
      setReason('');
    } else {
      // console.log('cannot create an empty interest');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>Interest Form</div>
      <form>
        <textarea
          required
          value={reason}
          onChange={event => setReason(event.target.value)}
        />
        <button type="button" onClick={handleInsert}>
          Submit
        </button>
      </form>
    </main>
  );
}
