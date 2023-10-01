import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

import type { Database } from '../database.types'

export const dynamic = 'force-dynamic'

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server'

    const title = formData.get('title')
    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.from('todos').insert({ title })
    revalidatePath('/')
  }

  return (
    <form action={addTodo}>
      <input name="title" />
    </form>
  )
}