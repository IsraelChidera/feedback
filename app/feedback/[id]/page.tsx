"use client"

import React, { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter, usePathname } from 'next/navigation';
import InvalidFeedback from '@/components/widget/InvalidFeedback';
import { createClient } from '@/app/utils/supabase/client';

const page = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);
    const [profileId, setProfileId] = useState<any>([]);
    const supabase = createClient();

    const router = useRouter();
    const pathname: string = usePathname();

    console.log("pat name", pathname);

    const initialValues = {
        fullname: "",
        feedback: "",
    };

    const validationSchema = Yup.object({
        fullname: Yup.string()
            .required('Full name is required')
            .min(3, 'Must be 10 characters or more'),
        feedback: Yup.string()
            .required('Business name is required')
            .min(10, 'Must be 10 characters or more'),
    });

    const getAbsoluteLink = (url: any) => {
        const pathname = url
        const pathSegments = pathname.split("/");
        const uuid = pathSegments[pathSegments.length - 1];

        return uuid;
    }

    const urlpathname: any = getAbsoluteLink(pathname);
    // console.log("here now", urlpathname)

    const onAddAdminFeedback = async (values: any) => {
        try{
            console.log(values);

        const { data: feedData, error } = await supabase
            .from('clientfeedbacks')
            .insert([
                {
                    fullname: values.fullname,
                    feedback: values.feedback,
                    clientfeedbackid: urlpathname,
                    // feedbackid: userProfile[0]?.id
                },
            ])
            .select()

        const { data, error: errorr } = await supabase
            .from('clientfeedbacklinks')
            .update({ 
                used: true,
                linkid: urlpathname 
            })
            .eq('link', urlpathname)
            .select()

        if (!error && !error) {
            alert("Successfully added ");
            alert("updated successfully");

            window.location.reload();
        }


        console.log({ feedData, error })
        console.log({data, errorr})
        }catch(error){
            console.log(error);
        }
    }

    const feedbacklinks = async () => {
        let { data: clientfeedbacklinks, error } = await supabase
            .from('clientfeedbacklinks')
            .select('*')
            .eq('link', urlpathname)

        setData(clientfeedbacklinks);
        console.log("dataaaaaaaaaad", data)
        console.log({ clientfeedbacklinks, error })
    }

    console.log("dataaaaaaaqqaaa", data)

    const getUrl = async (pathname: any) => {
        try {
            let { data: clientfeedbacklinks, error } = await supabase
                .from('clientfeedbacklinks')
                .select("*")
                .eq('link', pathname)

            console.log({ clientfeedbacklinks, error })
            if (!error) {
                // setData(clientfeedbacklinks);
            } if (clientfeedbacklinks?.length === 0) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUrl(urlpathname);
        feedbacklinks();
    }, [])


    if (!loading || data[0]?.used) {
        return (
            <main className="flex justify-center items-center h-screen">
                <InvalidFeedback />
            </main>
        )
    }

    return (
        <section className='mt-24 mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center font-semibold text-xl pt-4 text-primary'>Add Feedback {"as a user"}</h3>
                    <p className='text-center text-sm'>
                        We hope you enjoyed our product. Leave a feedback for us, we will like to hear you
                    </p>
                </div>

                <div className='mt-10 pb-20'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }: { resetForm: any }) => {
                            onAddAdminFeedback(values);
                            resetForm({ values: '' });
                        }}
                    >
                        {
                            (
                                { values, errors, touched, handleChange, }:
                                    {
                                        values: any, errors: any,
                                        touched: any, handleChange: any,
                                    }
                            ) => (
                                <>

                                    <Form className='md:w-[620px] mx-auto space-y-6'>
                                        <img src="/feedback-header.png" alt="feedback banner" />
                                        <div>
                                            <label className='block font-medium'>
                                                Full name
                                            </label>
                                            <input type="text"
                                                name="fullname"
                                                value={values.fullname}
                                                placeholder="Israel Chidera"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.fullname && touched.fullname && errors.fullname}
                                            </p>
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Feedback
                                            </label>
                                            <textarea
                                                name="feedback"
                                                value={values.feedback}
                                                placeholder="Type your feedback here . . ."
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                                rows={6}
                                                cols={6}
                                            >
                                            </textarea>
                                            <p className='text-xs text-primary'>
                                                {errors.feedback && touched.feedback && errors.feedback}
                                            </p>
                                        </div>

                                        <Button type="submit" className="w-full bg-primary text-white rounded-[10px]">
                                            Add feedback
                                        </Button>


                                    </Form>
                                </>
                            )}
                    </Formik>

                </div>
            </div>
        </section>
    )
}

export default page