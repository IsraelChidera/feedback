'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useState } from 'react';
import {
    useQuery,
    useQueryClient
} from '@tanstack/react-query';

export const UserContext = createContext<any>({});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [userProfile, setUserProfile] = useState<any>({});
    const [profile, setProfile] = useState<any>([]);

    const queryClient = useQueryClient();
    // const [loadProfile, setLoadProfile] = useState(false);
    // const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();

    queryClient.invalidateQueries({
        queryKey: ['userData'],
        exact: true,
      })

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
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            // console.log("user ppppp", user);
            let { data: profiles } = await supabase
                .from('profiles')
                .select("*")
                .eq("profileid", user?.id)

            setProfile(profiles)
        },
    });



    console.log("here,", userProfile);

    console.log("here profile,", profile);

    // if(!loading && !error){
    //     setUserProfile(data);
    // }

    // console.log({ loading, error, data })

    // const getUser: any = async () => {
    //     // setLoading(true);
    //     const { data: { user: users } } = await supabase.auth.getUser();
    //     // console.log("dskdjsk", users);
    //     const { data: profiles, error } = await supabase
    //         .from('profiles')
    //         .select('*')
    //         .eq('profileid', users?.id)

    //     // console.log("users profile check: ", users)
    //     if (!error) {
    //         // setLoading(false);
    //     }
    //     setUserProfile(users);
    // }

    // const getProfile: any = async () => {
    //     try {
    //         setLoadProfile(true);
    //         const { data: { session } } = await supabase.auth.getSession();
    //         const user = session?.user;
    //         // console.log("user ppppp", user);
    //         let { data: profiles, error } = await supabase
    //             .from('profiles')
    //             .select("*")
    //             .eq("profileid", user?.id)

    //         // console.log({ profiles, error });

    //         if (!error) {
    //             setLoadProfile(false);
    //             setProfile(profiles)
    //         }
    //         if (error) {
    //             throw new Error("Unable to get user");
    //         }
    //     } catch (error) {
    //         console.log("Unable to get user");
    //     }
    // }

    // useEffect(() => {
    //     getProfile();
    // }, [])

    // useEffect(() => {
    //     getUser();
    // }, [])  


    return (<UserContext.Provider value={{ userProfile, loading, profile, loadProfile }}>
        {children}
    </UserContext.Provider>)
}