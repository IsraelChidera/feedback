import Image from 'next/image';
import React from 'react';

const EmptyFeedback = () => {
    return (
        <div className='flex items-center w-full justify-center h-[50vh]'>
            <div>
                <div className='flex items-center justify-center'>
                    <Image width={158} height={158} src="/empty-feedback.png" alt="empty feedback" />
                </div>
                <div className='text-[#111827] text-center'>
                    <h2 className='text-[20px] text-semibold'>You haven't gotten any feedback yet. </h2>
                    <p className='text-[16px]'>
                        Kindly add a product or service to get feedbacks
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmptyFeedback