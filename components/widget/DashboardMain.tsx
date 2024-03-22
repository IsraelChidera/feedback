'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { useSelector } from 'react-redux';


const DashboardMain = () => {
 

    return (
        <main className='mx-auto w-[98%]'>
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
                <div className='flex items-center w-full justify-center h-[50vh]'>
                    <div>
                        <div className='flex items-center justify-center'>
                            <Image width={158} height={158} src="/empty-feedback.png" alt="empty feedback" />
                        </div>
                        <div className='text-[#111827] text-center'>
                            <h2 className='text-[20px] text-semibold'>You haven't gotten any feedback yet. </h2>
                            <p className='text-[16px]'>
                                Kindly add a product or service to get feedbacks
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DashboardMain