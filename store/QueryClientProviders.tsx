'use client'

import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const QueryClientProviders = async ({ children }: { children: React.ReactNode }) => {   
    // await queryClient.invalidateQueries(
    //     {
    //         queryKey: ['feedbackData'],
    //         //   exact,
    //         refetchType: 'active',
            
    //     },
    //     // { throwOnError, cancelRefetch },
    // )
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryClientProviders