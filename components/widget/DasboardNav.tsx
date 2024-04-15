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
    const [loading, setLoading] = useState(false);

    const supabase = createClientComponentClient()
    const router = useRouter();
    const pathname = usePathname();
    

    const getUser: any = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user);    
        return user
    }    

    useLayoutEffect(() => {
        getUser();
        // setCurrentUser(getUser());
    }, []);
    
    const handleOpenProfileMenu = () => {
        setOpen(prev => !prev)
    }

    const returnToDashboard = () => {
        router.push("/dashboard")
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut()
            router.push("/login");
            setLoading(false);
        } catch (error) {
            console.log("error:", error)
        }
    }

    return (
        <nav className='fixed z-40 top-0 right-0 bg-white w-full pl-0.5 py-6 px-3 '>
            <div className='flex justify-between items-center relative md:px-0 px-2'>
                <button className="lg:block hidden" onClick={returnToDashboard} type="button">
                    {
                        pathname === "/dashboard/profile" &&
                        <div className='flex items-center space-x-2'>
                            <div> <IoIosArrowRoundBack /> </div>
                            <p className='text-[15px] text-[#0A0A0C] opacity-35'>Back</p>
                        </div>
                    }                    
                </button>

                <Link className='tracking-tight lg:hidden block italic text-xl font-extrabold text-primary' href="/dashboard">
                    FS
                </Link>

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
                            <Link onClick={() => setOpen(false)} href="/dashboard/profile/edit">
                                View profile
                            </Link>
                        </li>

                        <li>
                            <Button onClick={handleLogout} className='text-sm bg-red-400 px-6 text-white py-1.5 rounded-md'>
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