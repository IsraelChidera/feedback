'use client'

import React, { useEffect, useState } from 'react'
import Container from '@/components/Container';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { ImSpinner8 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { createClient } from '../utils/supabase/client';

const page = () => {
    const supabase = createClient();
    const router = useRouter();
    const [error, setError] = useState<any>();
    const [errors, setErrors] = useState<any>();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        workEmail: '',
        password: '',
    };

    const validationSchema = Yup.object({
        workEmail: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Must be 6 characters or more'),
    });

    const onLogin = async (values: any) => {
        try {
            console.log("login values", values);
            setLoading(true);
            let { data, error } = await supabase.auth.signInWithPassword({
                email: values.workEmail,
                password: values.password
            });

            console.log({ data, error });

            if (error || !data?.session) {
                console.log("error inside", error)
                throw new Error("Login failed!");
            }

            return router.push("/dashboard");
        } catch (error: any) {
            setErrors(error);
            toast.error("Login failed!");
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
                throw new Error("Login failed!", error);
            }

            router.push('/dashboard');
        } catch (error: any) {
            setErrors(error);
            toast.error("Login failed!");
        } finally {
            setLoading(false);
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

            <section className='lg:h-full h-screen flex justify-center items-center lg:items-center lg:col-span-3 lg:px-0 px-3 pt-6 bg-white  '>
                <div className='w-full'>
                    <div>
                        <div className="lg:hidden flex items-center justify-center mb">
                            <Image width={184} height={48} src="/logo.svg" alt="logo" />
                        </div>

                        <div className='text-center'>
                            <h3 className='text-[#0A0A0C] lg:block hidden font-semibold text-[28px]'>
                                Welcome back!
                            </h3>
                            <p className='text-[#414143] md:text-sm text-base'>
                                Please login to access your account
                            </p>
                        </div>

                        <div className='mt-10 pb-20 px-4 md:px-0'>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={async (values: any, { resetForm }: { resetForm: any }) => {
                                    await onLogin(values);
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
                                            <Form className='md:w-[520px] w-full mx-auto space-y-6'>
                                                <div>
                                                    <TextField type="email" name='workEmail' id="workEmail" value={values.workEmail} onChange={handleChange} label="Work email" placeholder='info@business.com' />

                                                    <p className='text-xs text-primary'>
                                                        {errors.workEmail && touched.workEmail && errors.workEmail}
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

                                                <Button type="submit" className="w-full bg-primary text-white">
                                                    {
                                                        loading ? <div className="flex items-center justify-center">
                                                            <ImSpinner8 className="text-white animate-spin" />
                                                        </div>
                                                            :
                                                            <span>
                                                                Login
                                                            </span>
                                                    }
                                                </Button>

                                                <p className='text-center'>
                                                    Don't have an account yet? <Link className='underline text-primary' href="/register">Register</Link>
                                                </p>

                                            </Form>
                                        </>
                                    )}
                            </Formik>
                            <div className='pb-12 mt-10 text-center'>
                                <div className='relative'>
                                    <p className='login-options'>Or</p>
                                </div>

                                <div className='mt-3 flex items-center justify-center'>
                                    <Button className="bg-green-50 text-green-800 w-fit px-4">
                                        <div className="flex items-center space-x-2">
                                            <FaGoogle onClick={LoginWithGoogle} className='text-3xl text-[#ea4335] cursor-pointer' />
                                            <span className="block font-medium">Continue with Google</span>
                                        </div>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page