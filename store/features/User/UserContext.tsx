'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<any>("");
    const supabase = createClientComponentClient();

    const getUser: any = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user);
    }

    useEffect(() => {
        getUser();
    }, [currentUser])


    return (<UserContext.Provider value={{ getUser, currentUser }}>
        {children}
    </UserContext.Provider>)
}