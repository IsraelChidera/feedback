'use client'

import React, { useState, useRef, useContext } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { BsDownload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import { useRouter } from 'next/navigation';
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createClient } from '@/app/utils/supabase/client';
import { FaLinkedin, FaSquareFacebook, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const Background = ({ children, params, feedback: dd, }: { children: React.ReactNode, params?: any, feedback: any }) => {
    const { feedbacks } = useContext(FeedbackContext);
    const router = useRouter();

    const queryClient = useQueryClient();
    const feedbackItem = `${dd?.fullname} shared a feedback saying ${dd?.feedback.substring(0, 40)}...\n As a biz owner, you can also manage your feedbacks on "https://feedback-share.vercel.app/"`

    console.log("bg feedbavk: ", dd);
    const [backgroundColor, setBackgroundColor] = useState<any>(generateRandomColor());
    const backgroundRef: any = useRef(null);

    const supabase = createClient();

    // Function to generate a random color
    function generateRandomColor() {
        const randomColor = '#f7f7f7';
        return randomColor;
    }

    // Function to change background color
    function changeBackgroundColor() {
        setBackgroundColor(generateRandomColor());
    }

    // Function to capture and download the background image
    function downloadBackground() {
        html2canvas(backgroundRef.current).then(canvas => {
            canvas.toBlob((blob: any) => {
                {
                    saveAs(blob, 'background.png');
                }
            });
        });
    }

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            let { data: feedbacks, error: errors } = await supabase
                .from('feedbacks')
                .select('feedback')
                .eq("id", dd.id)


            console.log({ feedbacks, errors })

            return await supabase
                .from('feedbacks')
                .delete()
                .eq("id", dd.id)
        },
        onSuccess: () => {
            // setLoading(false);
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
            queryClient.invalidateQueries({ queryKey: ['userData'] })
            router.push("/dashboard");
        },
        onError: () => {
            toast.error("Unable to delete feedback");
        }

    })


    const handleDeleteFeedback = async (values: any) => {
        try {
            await mutation.mutateAsync(values);
        } catch (error) {
            console.log(error);
        }

        // let { data: feedbacks, error: errors } = await supabase
        //     .from('feedbacks')
        //     .select('feedback')
        //     .eq("id", dd.id)


        // console.log({ feedbacks, errors })

        // const { error } = await supabase
        //     .from('feedbacks')
        //     .delete()
        //     .eq("id", dd.id)

        // if (!error) {
        //     alert("Deleted sucessfully")
        //     router.push("/dashboard")
        // }
    }

    return (
        <div>
            <div ref={backgroundRef}
                style={{
                    backgroundColor: "#fff",
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
                className='rounded-lg pb-2'
            >
                {children}

            </div>
            <div className='mt-3 flex justify-between items-center w-full'>
                <div>
                    <p className="text-sm mb-2">Share on</p>
                    <div className="flex items-center space-x-2">
                        <Link target='_blank' href={`https://twitter.com/intent/tweet?url=${feedbackItem}`}>
                            <FaXTwitter className="cursor-pointer text-xl" />
                        </Link>

                        <Link target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${feedbackItem}`}>
                            <FaSquareFacebook className="cursor-pointer text-xl text-[#4267B2]" />
                        </Link>                    
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button type="button" className='p-3 text-white cursor-pointer rounded-full' onClick={downloadBackground}>
                        <BsDownload className='text-2xl text-green-700' />
                    </button>

                    <button onClick={handleDeleteFeedback} className="bg-red-600 hover:bg-red-400 flex items-center space-x-3 text-white py-2 rounded-md px-3">
                        <AiFillDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Background;
