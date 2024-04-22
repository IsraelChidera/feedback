'use client'
import React, { useContext } from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import { FiArrowUpRight } from "react-icons/fi";
import { UserContext } from '@/store/features/User/UserContext';

const Hero = () => {

    const { userProfile } = useContext(UserContext);

    return (
        <header className='bg-primary lg:h-screen pb-10 relative'>
            <Navbar />
            <Image
                src="/swirl.svg"
                alt="swirl svg"
                height={547} width={2254}
                className='opacity-20 md:block hidden absolute top-[30%] left-0 '
            />

            <Image
                src="/swirl.svg"
                alt="swirl svg"
                height={1047} width={254}
                className='opacity-40 md:hidden absolute top-[30%] left-0 '
            />

            <section className='pt-20 lg:pt-0 flex items-center justify-center h-full'>
                <Container className="lg:grid grid-cols-2 gap-x-3">
                    <div className='text-white'>
                        <h1 className='text-5xl font-semibold leading-tighter'>
                            Get More Done with <br />
                            Feedback Share
                        </h1>

                        <p className='mt-1 mb-10'>
                            Project management software that enables you and your teams
                            to collate, analyze and manage everyday feedbacks.

                            Seamlessly collect, organize, and share insights across all
                            your products with our innovative tool
                        </p>

                        {
                            userProfile ? <Link href="/dashboard" className='group cursor-pointer flex items-center space-x-2 w-fit  bg-[#FFE492] rounded-md text-base font-medium py-3 px-10 text-primary '>
                                <span>Go to dashboard</span>

                                <FiArrowUpRight className='group-hover:animate-bounce text-xl' />
                            </Link> :
                                <Link href="/register" className='group cursor-pointer flex items-center space-x-2 w-fit  bg-[#FFE492] rounded-md text-base font-medium py-3 px-10 text-primary '>
                                    <span>Try FeedShare free</span>

                                    <FiArrowUpRight className='group-hover:animate-bounce text-xl' />
                                </Link>
                        }                       
                    </div>

                    <div className='relative lg:mt-0 mt-10 block lg:flex items-center justify-center'>
                        <Image src="/heroImg2.png" className='lg:block hidden' alt="hero image" height={975} width={500} />
                        <Image src="/heroImg2.png" className='block lg:hidden' alt="hero image" height={375} width={500} />
                    </div>
                </Container>
            </section>
        </header>
    )
}

export default Hero