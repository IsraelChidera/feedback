'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useState } from 'react';
import {
    useQuery,
} from '@tanstack/react-query';

export const FeedbackContext = createContext<any>({});

export const FeedbackContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [getFeedbacks, setGetFeedbacks] = useState<any>([]);

    const supabase = createClientComponentClient();


    const { isPending: loading, error: loadProfileError, data } = useQuery({
        queryKey: ['feedbackData'],
        queryFn: async () => {
            const { data: { user: users } } = await supabase.auth.getUser();

            // console.log("user session", users)
            let { data: feedbacks, error } = await supabase
                .from('feedbacks')
                .select('*')
                .eq("feedbackid", users?.id)
            setGetFeedbacks(feedbacks);
        },
    });

    console.log("feeds", getFeedbacks)  

    return (<FeedbackContext.Provider value={{ getFeedbacks, loading }}>
        {children}
    </FeedbackContext.Provider>)
}