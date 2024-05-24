'use client'


import React, { createContext, useEffect, useState } from 'react';
import {
    useQuery,
} from '@tanstack/react-query';
import { createClient } from '@/app/utils/supabase/client';

export const FeedbackContext = createContext<any>({});

export const FeedbackContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [getFeedbacks, setGetFeedbacks] = useState<any>([]);

    const supabase = createClient();


    const { isPending: loading, error: loadProfileError, data } = useQuery({
        queryKey: ['feedbackData'],
        queryFn: async () => {
            try {
                const { data: { user: users } } = await supabase.auth.getUser();

                // console.log("user session", users)
                let { data: feedbacks, error } = await supabase
                    .from('feedbacks')
                    .select('*')
                    .eq("feedbackid", users?.id)
                setGetFeedbacks(feedbacks);
            } catch (error) {
                console.log("error: ", error)
            }
        },
    });

    console.log("feeds", getFeedbacks)

    return (<FeedbackContext.Provider value={{ getFeedbacks, loading }}>
        {children}
    </FeedbackContext.Provider>)
}