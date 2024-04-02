'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userProfile, setUserProfile] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();    

    const getUser: any = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('profileid', user?.id)

        if (!error) {
            setLoading(false);
        }
        setUserProfile(profiles);
    }

    useLayoutEffect(() => {
        getUser();
    }, [])


    return (<UserContext.Provider value={{ userProfile, loading }}>
        {children}
    </UserContext.Provider>)
}