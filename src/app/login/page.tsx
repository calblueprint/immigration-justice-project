"use client"

import { useState } from 'react';
import supabase from "../../api/supabase/createClient";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })
        console.log(error)
      }

    const signInWithEmail = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
        })
    }
    /* get rid of signOut 
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
    } 
    <button type="button" onClick={signOut}>Sign out</button>
    */

    return (
    <>
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={handleSignUp}>Sign up</button>
      <button type="button" onClick={signInWithEmail}>Sign in</button>
    </>
  )
}
