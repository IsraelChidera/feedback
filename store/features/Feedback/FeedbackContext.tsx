'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useLayoutEffect, useEffect, useState } from 'react';

export const FeedbackContext = createContext<any>({});

export const FeedbackContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();

    const getProfile: any = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        let { data: feedbacks, error } = await supabase
            .from('feedbacks')
            .select('*')
            .eq("feedbackid", user?.id)

        console.log({ feedbacks, error });

        if (!error) {
            setLoading(false);
        }

        setFeedbacks(feedbacks);
    }

    useEffect(() => {
        getProfile();
    }, [supabase])

    console.log("feed", feedbacks);

    return (<FeedbackContext.Provider value={{ feedbacks, loading }}>
        {children}
    </FeedbackContext.Provider>)
}