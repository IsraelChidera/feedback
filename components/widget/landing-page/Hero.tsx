import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';

const Hero = () => {
    return (
        <header className='bg-primary h-screen relative'>
            <Navbar />
            <Image 
                src="/swirl.svg" 
                alt="swirl svg" 
                height={547} width={2254} 
                className='opacity-40 md:block hidden absolute top-[30%] left-0 '
            />

            <Image 
                src="/swirl.svg" 
                alt="swirl svg" 
                height={1047} width={254} 
                className='opacity-40 md:hidden absolute top-[30%] left-0 '
            />

            <section className='flex items-center justify-center h-full'>
                <Container className="md:grid grid-cols-2 gap-x-3">
                    <div className='text-white'>
                        <h1 className='text-5xl font-semibold leading-tighter'>
                            Get More Done with <br />
                            Feedback Share
                        </h1>

                        <p className='mt-1 mb-10'>
                            Project management software that enables your teams
                            to collaborate, plan, analyze and manage everyday tasks
                        </p>

                        <Link href="/register" className=' bg-[#FFE492] rounded-md text-base font-medium py-3 px-10 text-primary '>
                            Try FeedShare free
                        </Link>
                    </div>
                </Container>
            </section>
        </header>
    )
}

export default Hero