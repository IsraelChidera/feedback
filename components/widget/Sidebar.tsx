'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation';
import { MdOutlineLogout } from "react-icons/md";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImSpinner8 } from "react-icons/im";
import { createClient } from '@/app/utils/supabase/client';

const Sidebar = () => {

    const pathname = usePathname();
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
        <div className='md:max-w-[328px] w-full z-50 h-screen flex flex-col relative justify-between py-10 pl-3 pr-8 '>
            <div>
                <Link href="/">
                    <Image width={204} height={58} src="/logo.svg" alt="logo" />
                </Link>

                <ul className='mt-20 grid grid-cols-1 space-y-6'>
                    <li>
                        <Link className={`${pathname.includes('dashboard') && pathname !== '/dashboard/feedbacks'  ? "transition ease-in bg-primary hover:bg-opacity-90 py-2 w-full pl-3 pr-2 text-white block rounded-[30px]" : ""} text-primary text-base pl-3 font-medium transition ease-in`}
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link className={`${pathname === '/dashboard/feedbacks'? 'transition ease-in bg-primary hover:bg-opacity-90 py-2 w-full pl-3 pr-2 text-white block rounded-[30px]' : 'text-primary pl-3 text-base font-medium'}`} href="/dashboard/feedbacks">
                            Feedback Responses
                        </Link>
                    </li>

                    {/* <li>
                        <Link
                            className={`${pathname === '/dashboard/analytics' ? "transition ease-in bg-primary hover:bg-opacity-90 py-2 w-full pl-3 pr-2 text-white block rounded-[30px]" : ""} text-primary text-base font-medium transition ease-in pl-3`}
                            href="#"
                        >
                            Analysis
                        </Link>
                    </li> */}
                </ul>
            </div>

            <Button onClick={handleLogout} className='cursor-pointer bg-[#FFE4E4] text-[#FF0000] hover:text-white hover:bg-red-900 transition-all ease-in'>
                {
                    loading ? <div className="flex items-center justify-center">
                        <ImSpinner8 className="text-white animate-spin" />
                    </div> :
                        <div className='flex space-x-3 px-4'>
                            <MdOutlineLogout className='text-2xl' /> <span>Logout</span>
                        </div>
                }
            </Button >
        </div >
    )
}

export default Sidebar