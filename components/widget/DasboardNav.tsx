'use client'

import React, { useLayoutEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import Link from 'next/link';
import Button from '@/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Image from 'next/image';

const DashboardNav = () => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [openMobileProfile, setOpenMobileProfile] = useState(false);
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
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

    const handleOpenProfileNav = () => {
        setOpenMobileProfile(prev => !prev);
    }

    const handleSidebarMenu = () => {
        setOpenMobileSidebar(true);
    }

    return (
        <nav className='relative bg-white w-full pl-0.5 py-6 px-3 '>
            <div className='hidden md:flex w-full justify-between items-center relative md:px-0 px-2'>
                <button className="md:block hidden" onClick={returnToDashboard} type="button">
                    {
                        pathname === "/dashboard/profile" &&
                        <div className='flex items-center space-x-2'>
                            <div> <IoIosArrowRoundBack /> </div>
                            <p className='text-[15px] text-[#0A0A0C] opacity-35'>Back</p>
                        </div>
                    }                    
                </button>

                <Link className='tracking-tight flex items-center space-x-1 pl-4 md:hidden italic text-xl font-extrabold text-primary' href="/dashboard">
                    <HiMiniBars3CenterLeft /> <span>FS</span>
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
                openMobileSidebar && <div className="px-3 py-10 h-screen fixed top-0 left-0 w-full z-50 bg-white">
                    <div className="flex justify-between items-center">
                        <IoCloseOutline className='cursor-pointer w-5 h-5' onClick={() => setOpenMobileSidebar(false)} />

                        <div onClick={handleLogout} className=" cursor-pointer flex items-center space-x-1">
                            <IoIosLogOut className='w-5 h-5' />
                            <span>Logout</span>
                        </div>
                    </div>

                    <div className='py-6 flex items-center justify-center'>
                        <Image width={154} height={48} src="/logo.svg" alt="logo" />
                    </div>

                    <ul className='mt-2 grid grid-cols-1 space-y-10'>
                        <li>
                            <Link className={`${pathname.includes('dashboard') ? "transition ease-in bg-primary hover:bg-opacity-90 py-2 w-full pl-3 pr-2 text-white block rounded-[30px]" : ""} text-primary text-base pl-3 font-medium transition ease-in`}
                                href="/dashboard"
                                onClick={() => setOpenMobileSidebar(false)}
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link onClick={() => setOpenMobileSidebar(false)} className='text-primary pl-3 text-base font-medium' href="#">
                                Feedback Response
                            </Link>
                        </li>

                        <li>
                            <Link
                                onClick={() => setOpenMobileSidebar(false)}
                                className={`${pathname === '/dashboard/analytics' ? "transition ease-in bg-primary hover:bg-opacity-90 py-2 w-full pl-3 pr-2 text-white block rounded-[30px]" : ""} text-primary text-base font-medium transition ease-in pl-3`}
                                href="/dashboard/analytics"
                            >
                                Analysis
                            </Link>
                        </li>
                    </ul>
                </div>
            }

            {/* Sidebar Mobile Navigation */}
            <div className="md:hidden block">
                <div className="relative">
                    <div className='flex items-center justify-between'>
                        <Link className='tracking-tight flex items-center space-x-1 pl-4 md:hidden italic text-xl font-extrabold text-primary' href="/dashboard">
                            <HiMiniBars3CenterLeft onClick={handleSidebarMenu} /> <span>FS</span>
                        </Link>

                        <div>
                            <FaCircleUser onClick={handleOpenProfileNav} className='cursor-pointer text-primary' width={100} height={100} />
                        </div>
                    </div>

                    {
                        openMobileProfile &&
                        <div className="z-20 px-3 py-3 text-right border rounded-md w-1/3 bg-white absolute top-8 right-2 ">
                            <ul className='text-sm'>
                                <li>
                                    <Link onClick={() => setOpenMobileProfile(false)} href="/dashboard/profile/edit">
                                        View profile
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }
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