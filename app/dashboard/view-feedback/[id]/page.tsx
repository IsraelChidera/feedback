'use client'
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import React, { useContext } from 'react';
import { saveAs } from 'file-saver';
import Background from '@/components/utils/Background';

const page = ({ params }: { params: any }) => {
    const { loading: loadFeedback, getFeedbacks: feedbacks } = useContext(FeedbackContext);
    // console.log("feeds", feedbacks)
    const feedback = feedbacks?.find((item: any) => item.id === params.id);

    const handleDownload = () => {
        // Perform download logic here
        // For example, create a text file and download it
        const content = "This is the content of the downloaded file.";
        const blob = new Blob([content], { type: 'text/plain' });
        saveAs(blob, 'downloaded.txt');
    };

    return (
        <section className='mx-auto mt-10 mb-12 w-[98%] bg-primary text-white rounded-2xl py-5 px-6'>
            <Background feedback={feedback}>
                <div className='py-3 px-1 rounded-3xl'>
                    <div>
                        {/* <div className='grid grid-cols-1 w-full'>
                            <img src="/feedback-banner.png" alt="feedback banner" className='w-full' />
                        </div> */}

                        <div className="px-5 py-4  rounded-lg mt-6 ">
                            <h3 className='text-2xl md:text-3xl text-[#202124]'>
                                {feedback?.fullname} <span className='italic'>submitted a feedback</span>
                            </h3>
                            <p className="text-[15px] text-[#202124] mt-1">
                                <span className='italic'>Saying . . . </span>{feedback?.feedback}
                            </p>
                        </div>
                    </div>
                </div>
            </Background>
        </section>
    )
}

export default page