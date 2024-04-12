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
        <div className='flex justify-between flex-col border-x rounded-b-lg border-b border-primary h-full'>
            <div className='h-28 bg-primary opacity-80 w-full  relative'>
                <div className=" w-full absolute top-2 right-2 ">
                    <div className='flex space-x-2 justify-end items-center'>
                        <Link href={`/dashboard/view-feedback/${id}`}>
                            <IoEyeOutline className='text-white text-xl' />
                        </Link>
                        <Link href={`/dashboard/update-feedback/${id}`}>
                            <FiEdit className='text-white text-lg' />
                        </Link>

                        <IoMdShare className='text-white text-lg' />
                    </div>
                </div>
            </div>

            <div className='p-3 border-x rounded-b-lg '>
                <div>
                    <div>
                        <h5 className='font-semibold text-[#111827] text-xl '>{businessname} </h5>

                    </div>
                    <p className='text-[#334] mt-1 leading-tight break-words '>
                        {feedback?.substring(0, 100)} . . .
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                        <p className='text-xs'>
                            Created on {new Date(createdat).toLocaleDateString()}
                        </p>
                        <p className='text-right text-xs text-[#0A0A0C]'>- {fullname}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback