'use client'

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Container from '@/components/Container';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { ImSpinner8 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';

const page = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({});

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

    const onContactFormSubmission = async (values: any) => {
        try {
            console.log(values);
            setLoading(true);

            let { data, error } = await supabase.auth.signUp({
                email: values.workEmail,
                password: values.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            })

            setError(error);

            console.log({ data, error });

            if (error) {
                throw new Error("Registration failed!")
            }
            toast.success("Registration successful");
            toast.info("Complete your email verification to continue the app");
            router.push('/login');
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    }

    const LoginWithGoogle = async () => {
        try {
            let { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            setError(error);
            console.log(data);
            

            if (error) {
                console.log("error inside", error)
                throw new Error("Login failed!");
            }

            router.push('/dashboard');
        } catch (error: any) {
            toast.error("Login failed!");
        }
    }

    const LoginWithFacebook = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
            });

            setError(error);
            console.log("data: ", data);
            if (error) {
                console.log("error inside", error)
                throw new Error("Login failed!");
            }

            router.push('/dashboard');
        } catch (error: any) {
            toast.error("Login failed!");
        }

    }

    return (
        <main className='lg:grid grid-cols-5'>
            <section className='lg:block hidden col-span-2 bg-primary relative'>
                <Container>
                    <div className='mt-10'>
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

            <section className='col-span-3 pt-12 px-3 lg:px-0 bg-white'>
                <div className="lg:hidden flex items-center justify-center mb">
                    <Image width={184} height={48} src="/logo.svg" alt="logo" />
                </div>
                <div className='text-center'>
                    <h3 className='text-[#0A0A0C] lg:block hidden font-semibold text-[28px]'>
                        Create account
                    </h3>
                    <p className='text-[#414143] md:text-sm text-base'>
                        Sign up for a free account today
                    </p>
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
                                    <Form className='md:w-[520px] px-3 lg:px-0 mx-auto space-y-6'>
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
                                            <p className='text-right text-sm underline'>
                                                forgot password?
                                            </p>
                                            <p className='text-xs text-primary'>
                                                {errors.password && touched.password && errors.password}
                                            </p>
                                        </div>

                                        <div>
                                            <div>
                                                <input name='privacyAndTerms' id="privacyAndTerms" type="checkbox" value={values.privacyAndTerms} onChange={handleChange} />
                                                <span className='text-sm text-inputText pl-2'>
                                                    Please exclude me from any future emails regarding FeedbackShare and related product and feature updates, marketing best practices, and promotions.
                                                </span>
                                                <p className='text-xs text-primary'>
                                                    {errors.privacyAndTerms && touched.privacyAndTerms && errors.privacyAndTerms}
                                                </p>
                                            </div>

                                            <div className='mt-1 text-sm'>
                                                <p className='text-inputText'>
                                                    By registering for an account, you are consenting to our
                                                    Terms of Service
                                                </p>
                                            </div>
                                        </div>



                                        <Button type="submit" className="w-full bg-primary text-white">
                                            {
                                                loading ? <div className="flex items-center justify-center">
                                                    <ImSpinner8 className="text-white animate-spin" />
                                                </div>
                                                    :
                                                    <span>
                                                        Get started
                                                    </span>
                                            }
                                        </Button>
                                    </Form>
                                </>
                            )}
                    </Formik>

                    <p className='text-center text-sm lg:text-base mt-8'>
                        Already have an account? <Link className='underline text-primary' href="/login">Login</Link>
                    </p>

                    <div className='pb-12 mt-10 text-center'>
                        <div className='relative'>
                            <p className='login-options'>Or</p>
                        </div>

                        <div className='mt-3 flex items-center justify-center'>
                            <div className='flex space-x-5 items-center'>
                                <FaGoogle onClick={LoginWithGoogle} className='cursor-pointer text-3xl text-[#ea4335]' />
                                <FaFacebook onClick={LoginWithFacebook} className='cursor-pointer text-3xl text-[#316ff6]' />
                                {/* <FaXTwitter className='text-3xl text-[#000]' />                                 */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default page