'use client';

import React, { useState } from 'react';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';

const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState<boolean>(false)

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
                            <Link href="#">Features</Link>
                        </li>

                        <li>
                            <Link href="#">How it works</Link>
                        </li>
                    </ul>

                    <div>
                        <Link href="/login" className='bg-[#FFE492] md:block hidden rounded-md text-base font-medium py-3 px-10 text-primary '>
                            Login
                        </Link>

                        <div className='md:hidden block'>
                            <HiMiniBars3CenterLeft onClick={handleOpenNavbar} className='cursor-pointer text-white text-2xl' />
                        </div>
                    </div>
                </div>

                {/* Mobile navigation */}
                {
                    openNavbar && <div className={`absolute transition-all -translate-y-2 ${openNavbar && 'translate-y-0'} top-10 right-0 w-full md:hidden block mt-2 rounded-md px-3 py-6 bg-white text-primary`}>
                        <ul className='space-y-6 text-right'>
                            <li>
                                <Link onClick={()=> setOpenNavbar(false)} href="#">Features</Link>
                            </li>

                            <li>
                                <Link onClick={()=> setOpenNavbar(false)} href="#">How it works</Link>
                            </li>
                        </ul>
                    </div>
                }
            </Container>

        </nav>
    )
}

export default Navbar