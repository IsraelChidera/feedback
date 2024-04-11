'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userProfile, setUserProfile] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();    

    const getUser: any = async () => {    
        setLoading(true);    
        const { data: { user: users } } = await supabase.auth.getUser();
        // console.log("dskdjsk", users);
        const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('profileid', users?.id)

            // console.log("users profile check: ", users)
        if (!error) {
            setLoading(false);                    
        }
        setUserProfile(users);
    }
    // console.log("userProfile:", userProfile)

    useEffect(() => {
        getUser();
    }, [])


    return (<UserContext.Provider value={{ userProfile, loading }}>
        {children}
    </UserContext.Provider>)
}