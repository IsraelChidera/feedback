"use client"

import React, { useContext } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserContext } from '@/store/features/User/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';


const page = () => {
    // const [currentUser, setCurrentUser] = useState<any>(null);

    const supabase = createClientComponentClient();

    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);

    const initialValues = {
        fullname: "",
        feedback: "",
    };

    const validationSchema = Yup.object({

        feedback: Yup.string()
            .required('Business name is required')
            .min(10, 'Must be 10 characters or more'),
    });


    const onAddAdminFeedback = async (values: any) => {
        console.log(values);    
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