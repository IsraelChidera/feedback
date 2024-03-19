import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";

const DasboardNav = () => {
    return (
        <nav className='bg-white w-full pl-0.5 py-6 px-3'>
            <div className='flex justify-end'>
                <div className='flex items-center space-x-3'>
                    <p className='text-[15px] text-[#0A0A0C] '>Israel Chidera</p>
                    <div className='cursor-pointer flex items-center space-x-1'>
                        <FaCircleUser className='text-primary' width={43} height={43}/>
                        <FaAngleDown width={25} height={25} className='text-[#0A0A0C] opacity-35' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default DasboardNav