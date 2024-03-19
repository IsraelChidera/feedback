'use client'
import Link from 'next/link';
import React from 'react';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation';
import { MdOutlineLogout } from "react-icons/md";
import Image from 'next/image';

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <div className='w-[328px] h-screen flex flex-col  justify-between py-10 pl-3 pr-8 '>
            <div>
                {/* <h1 className='text-2xl font-semibold text-primary'>Feedback</h1> */}
                <div>
                    <Image width={204} height={58} src="/logo.svg" alt="logo" />
                </div>

                <ul className='mt-20 grid grid-cols-1 space-y-6'>
                    <li>
                        <Link className={`${pathname==="/dashboard"? "bg-primary py-2 w-full pl-3 pr-2 text-white block rounded-[30px]": ""} text-primary text-base font-medium`} href="#">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link className='text-primary pl-3 text-base font-medium' href="#">
                            Feedback Response
                        </Link>
                    </li>

                    <li>
                        <Link className='text-primary pl-3 text-base font-medium' href="#">
                            Analysis
                        </Link>
                    </li>
                </ul>
            </div>

            <Button className='bg-[#FFE4E4] text-[#FF0000]'>
                <div className='flex space-x-3 px-4'>
                    <MdOutlineLogout className='text-2xl' /> <span>Logout</span>
                </div>
            </Button>
        </div>
    )
}

export default Sidebar