'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BsStars } from "react-icons/bs";
import Button from '@/components/Button';
import { useSelector } from 'react-redux';
import EmptyFeedback from './EmptyFeedback';
import Link from 'next/link';


const DashboardMain = () => {


    return (
        <main className='mx-auto w-[98%]'>
            <section className='py-6 px-4 w-full bg-primary text-white my-3 rounded-[10px]'>
                <h1 className='font-semibold text-2xl'>
                    Congrats <span><BsStars className='inline text-xl text-yellow-400' /></span>
                    <br />
                    You are now a part of our big family
                </h1>
                <p className='mt-1'>Complete your registration by setting up your <Link className='underline hover:no-underline transition-all ease-linear' href="/dashboard/profile">business profile</Link></p>
            </section>

            <section className='py-6 px-4 w-full bg-white my-3 rounded-[10px]'>
                <div>
                    <div className='flex justify-end space-x-4'>
                        <Button type="button" className='text-primary items-center flex space-x-2 px-3 text-sm bg-[#C4FFF4]'>
                            <Image width={25} height={25} src="/view-icon.svg" alt="view icon" />
                            <p>View Feedbacks</p>
                        </Button>

                        <Button type="button" className='text-primary border border-primary flex items-center space-x-2 px-3 text-sm bg-transparent'>
                            <Image width={25} height={25} src="/analytics-icon.svg" alt="view icon" />
                            <p>View Analytics</p>
                        </Button>

                        <Button type="button" className='flex items-center space-x-2 px-3 text-sm bg-primary text-white'>
                            <Image width={25} height={25} src="/add-icon.svg" alt="view icon" />
                            <p>Create New Feedback</p>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-6 mb-10 px-4 bg-white mt-6 w-full rounded-[10px] ">
                <EmptyFeedback />
            </section>
        </main>
    )
}

export default DashboardMain