'use client'
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import { BsDownload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Button from '../../../../components/Button';

const page = ({ params }: { params: any }) => {
    const { feedbacks } = useContext(FeedbackContext);

    const feedback = feedbacks?.find((item: any) => item.id === params.id);

    console.log("params", feedback)

    return (
        <section className='mx-auto mt-10 mb-12 w-[98%] bg-white rounded-2xl py-5 px-6'>
            <div className='block'>
                <img src="/feedback-banner.png" alt="feedback banner" className='w-full' />
            </div>

            <div className="px-5 py-4 border-t-8 border-b-1 border-b-[#DADCE0] border-x-1 border-x-[#DADCE0] mt-6 border-t-primary rounded-t-lg">
                <h3 className='text-3xl text-[#202124]'>{feedback?.fullname}'s Feedback</h3>
                <p className="text-[15px] text-[#202124] mt-1">
                    {feedback?.feedback}
                </p>

                <p className='text-sm text-right mt-1'>
                    - {feedback?.businessname}
                </p>

                <div className='flex items-center space-x-4'>
                    <BsDownload className='text-2xl' />

                    <Button className="bg-primary px-3 py-2 text-white flex items-center space-x-2">
                        <span className='block'>Delete</span> {" "}
                        <AiFillDelete className='text-2xl text-red-300' />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default page