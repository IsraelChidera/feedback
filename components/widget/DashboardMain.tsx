"use client"
import Image from 'next/image';
import React, { useState, useLayoutEffect } from 'react';
import { BsStars } from "react-icons/bs";
import Button from '@/components/Button';
import EmptyFeedback from './EmptyFeedback';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IoReloadSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useRouter } from 'next/navigation';


const DashboardMain = () => {
    const [userProfile, setUserProfile] = useState<any>({});
    const [feedbacks, setFeedbacks] = useState<any>([]);

    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient();

    const router = useRouter();

    const getProfiles = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('profileid', user?.id)

        if (!error) {
            setLoading(false);
        }
        setUserProfile(profiles);
    }

    const getFeedbacks = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        let { data: feedbacks, error } = await supabase
            .from('feedbacks')
            .select('*')
            .eq("feedbackid", user?.id)

        console.log({ feedbacks, error });

        if (!error) {
            setLoading(false);
        }

        setFeedbacks(feedbacks);
    }

    console.log(userProfile);
    console.log("feedbacks", feedbacks)

    useLayoutEffect(() => {
        getProfiles();
        getFeedbacks();
    }, [])

    const handleAddFeedback = () => {
        router.push("/dashboard/add-admin-feedback")
    }

    return (
        <main className='mx-auto w-[98%]'>
            {loading && !userProfile[0]?.isprofileupdated ?
                <div className="flex py-6 items-center justify-center">
                    <IoReloadSharp className='animate-spin' />
                </div>
                : !loading && userProfile[0]?.isprofileupdated ?
                    <section className='py-6 px-4 w-full bg-primary text-white my-3 rounded-[10px]'>
                        <div className='flex justify-between'>
                            <div className='justify-between flex flex-col space-y-10'>
                                <button onClick={handleAddFeedback} className='text-sm bg-white rounded-2xl px-3 py-1 text-primary font-semibold'>
                                    <span className="text-xl">+</span> Quick add
                                </button>

                                <div>
                                    <p className='text-sm text-[#f7f7f7]'>Total feedbacks</p>
                                    <h3 className='text-2xl'>{feedbacks? feedbacks.length : "0" } Feedbacks</h3>
                                </div>
                            </div>

                            <div>
                                <button className='text-sm bg-white rounded-2xl px-3 py-2 text-primary font-semibold'>
                                    View all feedback
                                </button>
                            </div>
                        </div>
                    </section>
                    :
                    <section className='py-6 px-4 w-full bg-primary text-white my-3 rounded-[10px]'>
                        <h1 className='font-semibold text-2xl'>
                            Congrats <span><BsStars className='inline text-xl text-yellow-400' /></span>
                            <br />
                            You are now a part of our big family
                        </h1>
                        <p className='mt-1'>Complete your registration by setting up your <Link className='underline hover:no-underline transition-all ease-linear' href="/dashboard/profile">business profile</Link></p>
                    </section>
            }


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
                    </div>
                </div>
            </section>

            <section className="py-6 mb-10 px-4 bg-white mt-6 w-full rounded-[10px] ">
                {
                    loading && !feedbacks ?
                        <div className="flex py-6 items-center justify-center">
                            <IoReloadSharp className='animate-spin' />
                        </div>
                        :
                        feedbacks && !loading ?
                            <div className='grid grid-cols-3 gap-x-6 gap-y-10'>
                                {
                                    feedbacks.map((feeds: any) => (
                                        <div>
                                            <div className='h-28 bg-primary w-full rounded-t-lg relative'>
                                                <div className=" w-full absolute top-2 right-2 ">
                                                    <div className='flex space-x-2 justify-end items-center'>
                                                        <IoEyeOutline className='text-white text-xl' />
                                                        <FiEdit className='text-white text-lg' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-3 border-x rounded-b-lg border-b border-primary'>
                                                <h5 className='font-semibold text-[#111827] text-xl '>{feeds.businessname} </h5>
                                                <p className='text-[#334] mt-1 leading-tight'>
                                                    {feeds?.feedback?.substring(0, 20)} . . .
                                                </p>
                                                <p className='text-right mt-2 text-xs text-[#0A0A0C]'>- {feeds.fullname}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <EmptyFeedback />
                }
            </section>
        </main>
    )
}

export default DashboardMain