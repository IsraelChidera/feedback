'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const FeedbackContext = createContext<any>({});

export const FeedbackContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [getFeedbacks, setGetFeedbacks] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClientComponentClient();

    const getProfile: any = async () => {
        try {
            setLoading(true);
            const { data: { user: users } } = await supabase.auth.getUser();

            console.log("user session", users)
            let { data: feedbacks, error } = await supabase
                .from('feedbacks')
                .select('*')
                .eq("feedbackid", users?.id)            
            if (error) {
                throw new Error("Error getting feedbacks");
            }
            if (!error) {
                setLoading(false);
            }

            setGetFeedbacks(feedbacks);
        } catch (error) {
            toast.error("Error getting feedbacks")
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (<FeedbackContext.Provider value={{ getFeedbacks, loading }}>
        {children}
    </FeedbackContext.Provider>)
}