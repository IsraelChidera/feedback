"use client"

import React, { useLayoutEffect, useState } from 'react';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Button from '@/components/Button';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const page = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const supabase = createClientComponentClient()

    const getUser: any = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user);
        setCurrentUser(user);
        return user
    }

    useLayoutEffect(() => {
        getUser();
        setCurrentUser(getUser());
    }, []);

    console.log(currentUser?.id);

    const initialValues = {
        businessname: "",
        fullname: '',
        country: '',
        phone: ""
    };

    const validationSchema = Yup.object({
        businessname: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        fullname: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        phone: Yup.string()
            .required('Phone number is required')
            .min(9, 'Must be 3 characters or more')
            .max(11, 'Must be 11 characters'),
        country: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
    });


    const onContactFormSubmission = async (values: any) => {
        console.log(values);

        const { data, error } = await supabase
            .from('profiles')
            .insert([
                {
                    profileid: currentUser.id,
                    businessname: values.businessname,
                    fullname: values.fullname,
                    country: values.country,
                    phone: values.phone,
                    isprofileupdated: true
                },
            ])
            .select();
        console.log("dhjs")
        console.log({ data, error })
    }

    return (
        <section className='mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center text-primary'>Business Profile</h3>
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
                                    <Form className='w-[620px] mx-auto space-y-6'>

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
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Business name
                                            </label>
                                            <input type="text"
                                                name="businessname"
                                                value={values.businessname}
                                                placeholder="Lumixus studio"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Phone number
                                            </label>
                                            <input type="text"
                                                name="phone"
                                                value={values.phone}
                                                placeholder="09056356356"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Country
                                            </label>
                                            <input type="text"
                                                name="country"
                                                value={values.country}
                                                placeholder="Nigeria"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <Button type="submit" className="w-full bg-primary text-white rounded-[10px]">
                                            Save changes
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