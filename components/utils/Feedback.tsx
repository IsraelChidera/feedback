import React from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { IoMdShare } from "react-icons/io";

type FeedbackProps = {
    businessname: string,
    feedback: string,
    fullname: string,
}

const Feedback = ({businessname, feedback, fullname}:FeedbackProps) => {
    return (
        <div>
            <div className='h-28 bg-primary w-full rounded-t-lg relative'>
                <div className=" w-full absolute top-2 right-2 ">
                    <div className='flex space-x-2 justify-end items-center'>
                        <IoEyeOutline className='text-white text-xl' />
                        <FiEdit className='text-white text-lg' />
                        <IoMdShare className='text-white text-lg' />
                    </div>
                </div>
            </div>
            <div className='p-3 border-x rounded-b-lg border-b border-primary'>
                <h5 className='font-semibold text-[#111827] text-xl '>{businessname} </h5>
                <p className='text-[#334] mt-1 leading-tight'>
                    {feedback?.substring(0, 20)} . . .
                </p>
                <p className='text-right mt-2 text-xs text-[#0A0A0C]'>- {fullname}</p>
            </div>
        </div>
    )
}

export default Feedback