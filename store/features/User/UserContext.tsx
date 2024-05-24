'use client'

import React, { createContext, useEffect, useState } from 'react';
import {
    useQuery    
} from '@tanstack/react-query';
import { createClient } from '@/app/utils/supabase/client';

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userProfile, setUserProfile] = useState<any>({});
    const [profile, setProfile] = useState<any>([]);


    const supabase = createClient();
   

    const { isPending: loading, error: loadUserError, data } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUserProfile(user);
        },
    });

    const { isPending: loadProfile, error: loadProfileError, data: profileData } = useQuery({
        queryKey: ['profileData'],
        queryFn: async () => {
            try{
                const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            // console.log("user ppppp", user);
            let { data: profiles } = await supabase
                .from('profiles')
                .select("*")
                .eq("profileid", user?.id)

            setProfile(profiles)
            }catch(error){
                console.log("error: ", error)
            }
        },
    });

    return (<UserContext.Provider value={{ userProfile, loading, profile, loadProfile }}>
        {children}
    </UserContext.Provider>)
}