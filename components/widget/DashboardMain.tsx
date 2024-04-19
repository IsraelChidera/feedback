"use client"
import Image from 'next/image';
import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import { BsStars } from "react-icons/bs";
import Button from '@/components/Button';
import EmptyFeedback from './EmptyFeedback';
import Link from 'next/link';
import { IoReloadSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Feedback from '../utils/Feedback';
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CopyToClipboardButton from './CopyToClipboardButton';
import { toast } from 'react-toastify';
import { MdOutlineFeed } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { MdOutlineMoreTime } from "react-icons/md";
import { GetTime } from '../utils/GetTime';
import { MdWavingHand } from "react-icons/md";

const DashboardMain = () => {
    const [userProfile, setUserProfile] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { loading: loadFeedback, getFeedbacks: feedbacks } = useContext(FeedbackContext);
    const [info, setInfo] = useState<any>("");

    const supabase = createClientComponentClient();
    const router = useRouter();

    // console.log("feddd", router)

    const handleAddFeedback = () => {
        router.push("/dashboard/add-admin-feedback")
    }

    const handleGenerateUserFeedbackLink = async () => {
        try {
            const link = userProfile?.profileid;

            const { data, error } = await supabase
                .from('clientfeedbacklinks')
                .insert([
                    {
                        used: false,
                        link: link
                    },
                ])
                .select()

            if (!error) {
                alert("Successful. Share link to user for feedback")
                setInfo(link);
            }
            console.log({ data, error })
        } catch (error) {
            alert(error)
        }
    }

    const getProfile: any = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            // console.log("user", user);
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select("*")
                .eq("profileid", user?.id)

            // console.log({ profiles, error });

            if (!error) {
                setLoading(false);
                setUserProfile(profiles)
            }
            if (error) {
                throw new Error("Unable to get user");
            }
        } catch (error) {
            toast.error("Unable to get user");
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <main className='mx-auto w-[98%]'>
            <section className='py-6 px-4 w-full bg-white my-3 rounded-[10px]'>
                <h2 className='text-2xl flex items-center space-x-2'>
                    <span>Hi, {GetTime()}</span>
                    <MdWavingHand className="text-primary text-2xl" />
                </h2>
                <p >
                    Have you gotten any feedback for {" "}
                    <span className='italic font-medium text-primary text-lg'>{userProfile[0]?.businessname}</span> {" "}
                    today?
                </p>
            </section>

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
                                    <h3 className='text-2xl'>{feedbacks ? feedbacks?.length : "0"} Feedback{feedbacks?.length === 0 || 1 ? null : "s"}</h3>
                                </div>
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
                    <div className='flex items-center justify-start md:justify-end md:space-x-4 space-x-2'>
                        <Button onClick={handleGenerateUserFeedbackLink} type="button" className='text-white items-center flex space-x-2 px-3 text-sm bg-primary' disable>
                            <p>Generate feedback link</p>
                        </Button>

                        <Button type="button" className='text-primary items-center flex space-x-2 px-3 text-sm bg-[#C4FFF4]'>
                            <Image width={25} height={25} src="/view-icon.svg" alt="view icon" />
                            <p className='md:block hidden'>View User Feedbacks</p>
                        </Button>

                        <Button type="button" className='text-primary border border-primary flex items-center space-x-2 px-3 text-sm bg-transparent'>
                            <Image width={25} height={25} src="/analytics-icon.svg" alt="view icon" />
                            <p className='md:block hidden'>View Analytics</p>
                        </Button>
                    </div>
                </div>

                {info && <div className=' flex justify-between items-center mt-4 bg-primary text-white py-3 text-sm px-4 w-full my-3 rounded-[10px]'>
                    <p>
                        Here is your link. Copy and share to user
                    </p>
                    <CopyToClipboardButton text={`http://localhost:3000/feedback/${info}`} />
                </div>}
            </section>

            <section className='py-6 px-4 w-full bg-white my-3 rounded-[10px]'>
                <h3 className="text-lg font-medium ">Overview</h3>

                <div className='mt-10 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
                    <div className='px-3 py-4 shadow-md flex justify-between items-center rounded-lg'>
                        <div className='space-y-4'>
                            <p className='text-lg font-semibold'>{feedbacks ? feedbacks.length : "0"}</p>
                            <p>All feedbacks</p>
                        </div>

                        <MdOutlineFeed className='text-2xl text-primary' />
                    </div>

                    <div className='px-3 py-4 shadow-md flex justify-between items-center rounded-lg'>
                        <div className='space-y-4'>
                            <p className='text-lg font-semibold'>0</p>
                            <p>Users feedback</p>
                        </div>

                        <FaUsersLine className='text-2xl text-primary' />
                    </div>

                    <div className='px-3 py-4 shadow-md flex justify-between items-center rounded-lg'>
                        <div className='space-y-4'>
                            <p className='text-lg font-semibold'>0</p>
                            <p>Today's Feedback</p>
                        </div>

                        <MdOutlineMoreTime className='text-2xl text-primary' />
                    </div>
                </div>
            </section>

            <section className="py-6 mb-10 px-4 bg-white mt-6 w-full rounded-[10px] ">
                {
                    loadFeedback && feedbacks?.length === 0 ?
                        <div className="flex py-6 items-center justify-center">
                            <IoReloadSharp className='animate-spin' />
                        </div>
                        : feedbacks?.length !== 0 ?
                            <div >
                                <h3 className="text-lg font-medium ">Feedbacks</h3>
                                <div className='mt-5 md:mt-10 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-10'>
                                    {
                                        feedbacks?.map((feeds: any) => (
                                            <Feedback
                                                key={feeds?.id}
                                                {...feeds}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <EmptyFeedback />
                }

            </section>
        </main>
    )
}

export default DashboardMain