'use client';

import React, { useState, useContext } from 'react';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { UserContext } from '@/store/features/User/UserContext';

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState<boolean>(false)

    const { userProfile } = useContext(UserContext);

    console.log("userProfile", userProfile)

    const handleOpenNavbar = () => {
        setOpenNavbar(prev => !prev);
    }

    return (
        <nav className='pt-6 md:pt-3'>
            <Container className='relative'>
                <div className="flex items-center justify-between">
                    <div>
                        <Image className='hidden md:block' width={184} height={48} src="/logo2.svg" alt="logo" />
                        <Link className='tracking-tight md:hidden flex items-center space-x-1   italic text-xl font-extrabold text-white' href="/dashboard">
                            <span>FS</span>
                        </Link>
                    </div>

                    <ul className='text-white hidden md:flex items-center space-x-6'>
                        <li>
                            <Link className='hover:underline transition-all ease-linear underline-offset-8' href="#features">Features</Link>
                        </li>

                        <li>
                            <Link className='cursor-not-allowed' href="#">How it works</Link>
                        </li>
                    </ul>

                    <div>
                        {
                            userProfile ? <Link href="/dashboard" className='bg-[#FFE492] md:block hidden rounded-md text-base font-medium py-3 px-10 text-primary '>
                                Go to dashboard
                            </Link> :
                                <Link href="/login" className='bg-[#FFE492] md:block hidden rounded-md text-base font-medium py-3 px-10 text-primary '>
                                    Login
                                </Link>
                        }
                        {/* <Link href="/login" className='bg-[#FFE492] md:block hidden rounded-md text-base font-medium py-3 px-10 text-primary '>
                            Login
                        </Link> */}

                        <div className='md:hidden block'>
                            <HiMiniBars3CenterLeft onClick={handleOpenNavbar} className='cursor-pointer text-white text-2xl' />
                        </div>
                    </div>
                </div>

                {/* Mobile navigation */}
                {
                    openNavbar && <div className={`absolute top-10 right-0 w-full md:hidden block mt-2 rounded-md px-3 py-6 bg-white text-primary`}>
                        <ul className='space-y-6 text-right'>
                            <li>
                                <Link onClick={() => setOpenNavbar(false)} href="#features">Features</Link>
                            </li>

                            <li>
                                <Link onClick={() => setOpenNavbar(false)} href="#">How it works</Link>
                            </li>

                            <li>
                                {
                                    userProfile ? <Link className='bg-[#FFE492] rounded-md text-base font-medium py-3 px-10 text-primary' onClick={() => setOpenNavbar(false)} href="/dashboard">
                                        Go to dashboard
                                    </Link> : <Link className='bg-[#FFE492] rounded-md text-base font-medium py-3 px-10 text-primary' onClick={() => setOpenNavbar(false)} href="/login">
                                        Login
                                    </Link>
                                }

                            </li>
                        </ul>
                    </div>
                }
            </Container>

        </nav>
    )
}

export default Navbar