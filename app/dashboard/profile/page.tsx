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
        businessName: '',
        workEmail: '',
        phoneNumber: '',
        country: '',
        displayName: '',
        fullName: ''
    };

    const validationSchema = Yup.object({
        businessName: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        fullName: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        displayName: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .min(9, 'Must be 3 characters or more')
            .max(11, 'Must be 11 characters'),
        workEmail: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
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
                    id: currentUser.id,
                    businessname: values.businessName,
                    fullname: values.fullName,
                    phonenumber: values.phoneNumber,
                    country: values.country,
                    avatarurl: values.workEmail
                },
            ])
            .select()

        console.log({ data, error })
    }

    return (
        <section className='mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center text-[#828282]'>Account Information</h3>
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
                                                name="fullName"
                                                value={values.fullName}
                                                placeholder="Israel Chidera"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Display name
                                            </label>
                                            <input type="text"
                                                name="displayName"
                                                value={values.displayName}
                                                placeholder="Chidera22"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Business name
                                            </label>
                                            <input type="text"
                                                name="businessName"
                                                value={values.businessName}
                                                placeholder="Lumixus studio"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Email
                                            </label>
                                            <input type="text"
                                                name="workEmail"
                                                value={values.workEmail}
                                                placeholder="israel@gmail.com"
                                                onChange={handleChange}
                                                className='border text-sm border-[#e0e0e0] w-full rounded-[10px] text-[#111827] py-[16px] pl-[14px] pr-[10px]'
                                            />
                                        </div>

                                        <div>
                                            <label className='block font-medium'>
                                                Phone number
                                            </label>
                                            <input type="text"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
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