'use client'

import React, { useLayoutEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import Link from 'next/link';
import Button from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IoIosArrowRoundBack } from "react-icons/io";

const DashboardNav = () => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const supabase = createClientComponentClient()

    const getUser: any = async () => {
        const { data: { user } } = await supabase.auth.getUser()        
        setCurrentUser(user);
        return user
    }

    useLayoutEffect(() => {
        getUser();
        setCurrentUser(getUser());
    }, []);

    // console.log(currentUser);

    const router = useRouter();
    const pathname = usePathname();

    const handleOpenProfileMenu = () => {
        setOpen(prev => !prev)
    }

    const returnToDashboard = () => {
        router.push("/dashboard")
    }

    return (
        <nav className='bg-white w-full pl-0.5 py-6 px-3 relative'>
            <div className='flex justify-between'>
                <button onClick={returnToDashboard} type="button">
                    {
                        pathname === "/dashboard/profile" &&
                        <div className='flex items-center space-x-2'>
                            <div> <IoIosArrowRoundBack /> </div>
                            <p className='text-[15px] text-[#0A0A0C] opacity-35'>Back</p>
                        </div>
                    }

                </button>

                <div className='flex items-center space-x-3'>
                    <p className='text-[15px] text-[#0A0A0C] '>{currentUser?.email}</p>
                    <div onClick={handleOpenProfileMenu} className='cursor-pointer flex items-center space-x-1'>
                        <FaCircleUser className='text-primary' width={43} height={43} />
                        <FaAngleDown width={25} height={25} className='text-[#0A0A0C] opacity-35' />
                    </div>
                </div>
            </div>

            {
                open &&
                <div className="z-20 px-3 py-3 text-right border rounded-md w-1/3 bg-white absolute top-14 right-2 ">
                    <ul className='text-sm space-y-4'>
                        <li>
                            <Link onClick={() => setOpen(false)} href="/dashboard/profile">
                                View profile
                            </Link>
                        </li>

                        <li>
                            <Button className='text-sm bg-red-400 px-6 text-white py-1.5 rounded-md'>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </div>
            }


        </nav>
    )
}

export default DashboardNav