"use client"

// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import supabase from '../../api/supabase/createClient';




export default function ResetPassword() {
    const [newPassword, setPassword] = useState('');
    const { push } = useRouter();
    const resetPassword = async () => {
        await supabase.auth.updateUser({ password: newPassword});
        push("/login");
    }
    
    return (
        <> 
            <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={newPassword}
            />
            <button type="button" onClick={resetPassword}>Reset Password</button>
        </>
    );
}
