/*
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>immigration justice project</div>
    </main>
  );
}
*/

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './page.module.css';

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export default async function ServerComponent() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase.from('todos').select()
  return (
    <main className={styles.main}>
      <div className={styles.description}>immigration justice project</div>
    </main>
  );
}