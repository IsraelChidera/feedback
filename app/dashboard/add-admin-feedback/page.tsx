"use client"

import React, { useContext } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserContext } from '@/store/features/User/UserContext';
import { useRouter } from 'next/navigation';


const page = () => {
    // const [currentUser, setCurrentUser] = useState<any>(null);

    const supabase = createClientComponentClient();
    const { userProfile } = useContext(UserContext);
    const router = useRouter();

    const initialValues = {
        businessname: userProfile[0]?.businessname,
        fullname: userProfile[0]?.fullname,
        feedback: '',
    };

    const validationSchema = Yup.object({

        feedback: Yup.string()
            .required('Business name is required')
            .min(10, 'Must be 10 characters or more'),
    });


    const onAddAdminFeedback = async (values: any) => {
        console.log(values);

        const { data, error } = await supabase
            .from('feedbacks')
            .insert([
                {
                    feedbackid: userProfile[0]?.profileid,
                    businessname: values.businessname,
                    fullname: values.fullname,
                    feedback: values.feedback,
                },
            ])
            .select()

        if (!error) {
            console.log("feedback added", data);
            alert("feeded is added successfully")
            router.push("/dashboard");
        }
        console.log({ data, error })
    }

    return (
        <section className='mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center text-xl font-medium pt-4 text-primary'>Add Feedbeek {"as a business owner"}</h3>
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
                                    <Form className='w-[620px] mx-auto space-y-6'>
                                        <div>
                                            <label className='block font-medium'>
                                                Full name
                                            </label>
                                            <input type="text"
                                                name="fullname"
                                                value={values.fullname}
                                                placeholder={userProfile[0]?.fullname}
                                                // onChange={handleChange}
                                                className='cursor-not-allowed border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                                disabled
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.fullname && touched.fullname && errors.fullname}
                                            </p>
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Business name
                                            </label>
                                            <input type="text"
                                                name="businessname"
                                                value={values.businessname}
                                                placeholder={userProfile[0]?.businessname}
                                                // onChange={handleChange}
                                                className='cursor-not-allowed border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                                disabled
                                            />
                                            <p className='text-xs text-primary'>
                                                {errors.businessname && touched.businessname && errors.businessname}
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