"use client"

import { useState } from 'react';
import supabase from '../../api/supabase/createClient';


export default function ResetPassword() {
    const [newPassword, setPassword] = useState('');
    const resetPassword = async () => {
        await supabase.auth.updateUser({ password: newPassword});
    }
    //const redirect = (url, asLink = true) => asLink ? (window.location.href = url) : window.location.replace(url);
    
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