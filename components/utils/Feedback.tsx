import React from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { IoMdShare } from "react-icons/io";
import Link from 'next/link';

type FeedbackProps = {
    businessname: string,
    feedback: string,
    fullname: string,
    id: any,
    createdat: any
}

const Feedback = ({ businessname, feedback, id, fullname, createdat }: FeedbackProps) => {
    return (
        <div className='rounded-b-lg shadow-md border-primary'>
            <div className='flex space-x-2 justify-end text-primary items-center'>
                <Link href={`/dashboard/view-feedback/${id}`}>
                    <IoEyeOutline className='text-xl' />
                </Link>
                <Link href={`/dashboard/update-feedback/${id}`}>
                    <FiEdit className='text-lg' />
                </Link>

                <IoMdShare className='text-white text-lg' />
            </div>

            <div className='p-3 border-x rounded-b-lg '>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h5 className='font-semibold text-[#111827] text-xl '> {fullname} </h5>
                        <p className='text-[#334] mt-1 leading-tight break-words '>
                            {feedback?.substring(0, 100)} . . .
                        </p>
                    </div>
                    <div>
                        <div className="mt-2 flex items-center justify-between">
                            <p className='text-xs'>
                                {new Date(createdat).toLocaleDateString()}
                            </p>
                            {businessname &&
                                <p className='text-right text-xs text-[#0A0A0C]'>- {businessname}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback