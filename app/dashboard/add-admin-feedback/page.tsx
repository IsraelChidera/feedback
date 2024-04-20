"use client"

import React, { useState, useEffect, useContext } from 'react';
import Button from '@/components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ImSpinner8 } from "react-icons/im";
import { UserContext } from '@/store/features/User/UserContext';
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query';

const page = () => {
    const [loading, setLoading] = useState(false);

    const { userProfile } = useContext(UserContext);
    const queryClient = useQueryClient();


    const supabase = createClientComponentClient();
    const router = useRouter();

    const initialValues = {
        businessname: '',
        fullname: '',
        feedback: '',
    };

    const validationSchema = Yup.object({
        businessname: Yup.string()
            // .required('Full name is required')
            .min(3, 'Must be 3 characters or more'),
        fullname: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        feedback: Yup.string()
            .required('Business name is required')
            .min(10, 'Must be 10 characters or more'),
    });

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            return await supabase
                .from('feedbacks')
                .insert([
                    {
                        feedbackid: userProfile.id,
                        businessname: values?.businessname,
                        fullname: values?.fullname,
                        feedback: values?.feedback,
                    },
                ])
                .select()
        },
        onSuccess: () => {
            setLoading(false);
            queryClient.invalidateQueries({queryKey: ['feedbackData']})
            queryClient.invalidateQueries({queryKey: ['userData']})
            toast.success("Feedback added successfully");
            router.push("/dashboard");
        },
        onError: () => {
            setLoading(false);
            toast.error("Unable to add feedback");
        }

    })


    const onAddAdminFeedback = async (values: any) => {
        try {
            setLoading(true);

            await mutation.mutateAsync(values);
            console.log(values);            
           
        } catch (error) {
            setLoading(false);
            toast.error("Unable to add feedback");
        }
    }


    return (
        <section className='mt-2 mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center text-xl font-medium pt-4 text-primary'>Add Feedback</h3>
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
                                        <div>
                                            <label className='block font-medium'>
                                                Full name<span className='text-[#ff0000]'>*</span>
                                            </label>
                                            <input type="text"
                                                name="fullname"
                                                value={values.fullname}
                                                placeholder="Add full name"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.fullname && touched.fullname && errors.fullname}
                                            </p>
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Business name<span className='text-xs'>{"("}optional{")"}</span>
                                            </label>
                                            <input type="text"
                                                name="businessname"
                                                value={values.businessname}
                                                placeholder="Add business name"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.businessname && touched.businessname && errors.businessname}
                                            </p>
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Feedback <span className='text-[#ff0000]'>*</span>
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
                                            {loading ? <div className="flex items-center justify-center">
                                                <ImSpinner8 className="text-white animate-spin" />
                                            </div>
                                                :
                                                <span>
                                                    Add feedback
                                                </span>}
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