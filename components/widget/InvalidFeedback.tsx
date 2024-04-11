import Image from 'next/image';
import React from 'react';

const InvalidFeedback = () => {
    return (
        <div className='flex items-center w-full justify-center h-[50vh]'>
            <div>
                <div className='flex items-center justify-center'>
                    <Image width={158} height={158} src="/empty-feedback.png" alt="empty feedback" />
                </div>
                <div className='text-[#111827] text-center'>
                    <h2 className='text-[26px] text-semibold'>Invalid or used feedback link. </h2>
                    <p className='text-[16px]'>
                        Thank you for your input
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InvalidFeedback