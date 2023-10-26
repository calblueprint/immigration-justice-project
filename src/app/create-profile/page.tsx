'use client';

// import { UUID } from 'crypto';
import { useState } from 'react';
// import { insertProfile } from '../../api/supabase/queries/profiles';
import { Profile } from '../../types/schema';
import styles from '../page.module.css';

export default function Profile() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleInsert = async () => {
    if (!firstName || !lastName) return;
    setFirstName('');
    setLastName('');
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>Create Profile Form</div>
      <form>
        <div>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              name="firstName"
              required
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              name="lastName"
              required
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={handleInsert}>
          Submit
        </button>
      </form>
    </main>
  );
}
