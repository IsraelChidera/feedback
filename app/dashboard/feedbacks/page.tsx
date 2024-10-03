'use client'
import Feedback from '@/components/utils/Feedback';
import EmptyFeedback from '@/components/widget/EmptyFeedback';
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import Link from 'next/link';
import React, { useContext } from 'react';
import { MdOutlineArrowBack } from "react-icons/md";

const page = () => {

    const { loading: loadFeedback, getFeedbacks: feedbacks } = useContext(FeedbackContext);
    return (
        <main className='mx-auto my-6 w-[98%] bg-white min-h-screen px-3 py-6'>
            <section>
                <div className='md:mb-4 mb-6 flex justify-end'>
                    <Link className='flex hover:underline group transition-all ease-linear items-center space-x-2' href="/dashboard">
                        <MdOutlineArrowBack className="group-hover:translate-x-2 translate-x-0" />
                        <span className='text-sm'>Return to dashboard</span>
                    </Link>
                </div>

                <div>
                    {
                        feedbacks?.length > 0 ?
                            <div className='mt-5 md:mt-10 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-10'>
                                {
                                    feedbacks?.map((feeds: any) => (
                                        <Feedback
                                            key={feeds?.id}
                                            {...feeds}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <div className='flex items-center w-full justify-center'>
                                <EmptyFeedback />
                            </div>
                    }
                </div>
            </section>
        </main>
    )
}

export default page