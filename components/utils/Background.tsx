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

const Background = ({ children, params, feedback: dd, }: { children: React.ReactNode, params?: any, feedback: any }) => {
    const { feedbacks } = useContext(FeedbackContext);
    const router = useRouter();

    const queryClient = useQueryClient();
    const feedback = feedbacks?.find((item: any) => item.id === params?.id);

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
            <div className='flex justify-end my-4'>
                <button onClick={handleDeleteFeedback} className="bg-red-600 hover:bg-red-400 flex items-center space-x-3 text-white py-2 rounded-md px-6">
                    <span className='text-sm'>Delete</span>
                    <AiFillDelete />
                </button>
            </div>
            <div ref={backgroundRef}
                style={{
                    backgroundColor: backgroundColor,
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
            <div className='mt-3 flex justify-center items-center'>
                <button type="button" className='bg-primary p-3 text-white cursor-pointer rounded-full' onClick={downloadBackground}>
                    <BsDownload className='text-2xl ' />
                </button>
            </div>
        </div>
    );
};

export default Background;
