'use client'

import React from 'react'
import Container from '@/components/Container';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const page = () => {
    const initialValues = {
        businessName: '',
        workEmail: '',
        phoneNumber: '',
        password: '',
        privacyAndTerms: false
    };

    const validationSchema = Yup.object({
        businessName: Yup.string()
            .required('Business name is required')
            .min(3, 'Must be 3 characters or more'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .min(9, 'Must be 3 characters or more')
            .max(11, 'Must be 11 characters'),
        workEmail: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Must be 6 characters or more'),
        privacyAndTerms: Yup.string().required('ProjectOwner is required'),
    });

    const onContactFormSubmission = (values: any) => {
        console.log(values);
    }

    return (
        <main className='grid grid-cols-5'>
            <section className='col-span-2 bg-primary relative'>
                <Container>
                    <div className='mt-10'>
                        {/* <div className='text-2xl font-semibold text-white'>Feedback</div> */}
                        <div>
                            <Image width={204} height={58} src="/logo2.svg" alt="logo" />
                        </div>

                        <h1 className='text-white font-semibold mt-10 text-[35px] leading-tight'>
                            Welcome to Feedback Share - Revolutionizing
                            Client Feedback!
                        </h1>

                        <p className='mt-4 text-white'>
                            We understand the value of client feedback
                            in shaping businesses for success.
                        </p>
                    </div>
                </Container>

                <Image className='absolute -top-20 right-0' src="/points1.svg" width={92.57} height={113.14} alt="points" />

                <div className='mt-28 mb-40'>
                    <Image src="/register1.png" width={572.05} height={265} alt="feedback" />
                </div>

                <Image className='absolute bottom-0 left-0' src="/points2.svg" width={305.29} height={373.14} alt="points" />
            </section>

            <section className='col-span-3 pt-6 bg-offWhite'>
                <div className='text-center'>
                    <h3 className='text-[#0A0A0C] font-semibold text-[28px]'>
                        Sign up with free trial
                    </h3>
                    <p className='text-[#414143]'>Empower your experience, sign up for a free account today</p>
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
                                    <Form className='w-[520px] mx-auto space-y-6'>
                                        <div>
                                            <TextField type="text" name='businessName' id="businessName" value={values.businessName} onChange={handleChange} label="Business Name" placeholder='Business Name' />

                                            <p className='text-xs text-primary'>
                                                {errors.businessName && touched.businessName && errors.businessName}
                                            </p>
                                        </div>

                                        <div>
                                            <TextField type="email" name='workEmail' id="workEmail" value={values.workEmail} onChange={handleChange} label="Work email" placeholder='info@business.com' />

                                            <p className='text-xs text-primary'>
                                                {errors.workEmail && touched.workEmail && errors.workEmail}
                                            </p>
                                        </div>

                                        <div>
                                            <TextField type="phone" name='phoneNumber' id="phoneNumber" value={values.phoneNumber} onChange={handleChange} label="Phone number" placeholder='+234 814 626 5074' />

                                            <p className='text-xs text-primary'>
                                                {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                            </p>
                                        </div>

                                        <div>
                                            <TextField type="password" name='password' id="password" value={values.password} onChange={handleChange} label="Password" placeholder='enter password' />

                                            <p className='text-xs text-primary'>
                                                {errors.password && touched.password && errors.password}
                                            </p>
                                        </div>

                                        <div>
                                            <input name='privacyAndTerms' id="privacyAndTerms" type="checkbox" value={values.privacyAndTerms} onChange={handleChange} />
                                            <span className='text-sm text-inputText pl-2'>
                                                Please exclude me from any future emails regarding FeedbackShare and related product and feature updates, marketing best practices, and promotions.
                                            </span>
                                            <p className='text-xs text-primary'>
                                                {errors.privacyAndTerms && touched.privacyAndTerms && errors.privacyAndTerms}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-inputText'>
                                                By registering for an account, you are consenting to our 
                                                Terms of Service and confirming that you have reviewed and 
                                                accepted the Global Privacy Statement.
                                            </p>
                                        </div>

                                        <Button type="submit" className="w-full bg-primary text-white">
                                            Get started
                                        </Button>

                                        <p className='text-center'>
                                            Already have an account? <Link className='underline text-primary' href="/login">Login</Link>
                                        </p>
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