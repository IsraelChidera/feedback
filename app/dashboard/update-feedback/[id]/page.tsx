'use client'

import React, { useState, useContext } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import { FeedbackContext } from '@/store/features/Feedback/FeedbackContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ImSpinner8 } from "react-icons/im";
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query';

const page = ({ params }: { params: any }) => {

    const [loading, setLoading] = useState(false);
    const { getFeedbacks: feedbacks } = useContext(FeedbackContext);
    // const {userProfile} = useContext(UserContext );

    const queryClient = useQueryClient();
    const router = useRouter();

    const supabase = createClientComponentClient();

    const feedback: any = feedbacks?.find((item: any) => item.id === params.id);

    const initialValues = {
        businessname: feedback?.businessname,
        fullname: feedback?.fullname,
        feedback: feedback?.feedback,
        id: feedback?.id
    };

    const validationSchema = Yup.object({
        businessname: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        fullname: Yup.string()
            .required('Full name is required')
            .min(3, 'Must be 3 characters or more'),
        feedback: Yup.string()
            .required('Feedback is required')
            .min(10, 'Must be 10 characters or more'),
    });

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            return await supabase
                .from('feedbacks')
                .update({
                    businessname: values.businessname,
                    fullname: values.fullname,
                    feedback: values.feedback,
                })
                .eq('id', values.id)
                .select()
        },
        onSuccess: () => {
            setLoading(false);
            queryClient.invalidateQueries({ queryKey: ['feedbackData'] })
            queryClient.invalidateQueries({ queryKey: ['userData'] })
            toast.success("Feedback added successfully");
            router.push("/dashboard");
        },
        onError: () => {
            setLoading(false);
            toast.error("Unable to add feedback");
        }

    })


    const onContactFormSubmission = async (values: any) => {
        try {
            setLoading(true);
            console.log({ ...values });
            await mutation.mutateAsync(values);
            
        } catch (error) {
            toast.error("Error updating feedback")
            setLoading(false);
        }

    }

    return (
        <main className='mt-2 mx-auto w-[98%]'>
            <section className='py-6 px-4 w-full bg-white my-3 rounded-[10px]'>
                <div>
                    <h3 className='text-center text-xl font-semibold text-primary'>Update Feedback</h3>
                </div>


                <div className='mt-10 pb-20'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }: { resetForm: any }) => {
                            onContactFormSubmission(values);
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
                                        <TextField
                                            label="id"
                                            id="id"
                                            type="hidden"
                                            placeholder="id"
                                            value={values.id}
                                            onChange={handleChange}
                                            className='cursor-not-allowed'
                                        />

                                        <div>
                                            <TextField
                                                label="Business name"
                                                id="businessname"
                                                type="text"
                                                placeholder={feedback?.businessname}
                                                value={values.businessname}
                                                onChange={handleChange}
                                            // className='cursor-not-allowed'
                                            // disabled={true}
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.businessname && touched.businessname && errors.businessname}
                                            </p>
                                        </div>


                                        <div>
                                            <TextField
                                                label="Full name"
                                                id="fullname"
                                                type="text"
                                                placeholder={feedback?.fullname}
                                                value={values.fullname}
                                                onChange={handleChange}
                                            // disabled={true}
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
                                                placeholder={feedback?.feedback}
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

                                        <Button
                                            type="submit"
                                            className={`w-full text-white rounded-[10px] ${values.businessname === feedback?.businessname && values.fullname === feedback?.fullname && values.feedback === feedback?.feedback ? 'bg-opacity-40 bg-primary' : 'bg-primary'}`}
                                            disable={values.businessname === feedback?.businessname && values.fullname === feedback?.fullname && values.feedback === feedback?.feedback}
                                        >
                                            {loading ? <div className="flex items-center justify-center">
                                                <ImSpinner8 className="text-white animate-spin" />
                                            </div>
                                                :
                                                <span>
                                                    Update feedback
                                                </span>}
                                        </Button>


                                    </Form>
                                </>
                            )}
                    </Formik>

                </div>
            </section>
        </main>
    )
}

export default page