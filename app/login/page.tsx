'use client'

import React, { useEffect, useState } from 'react'
import Container from '@/components/Container';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const page = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [errors, setErrors] = useState<string>("");

    const user = useSelector((state: any) => state.user.value)

    useEffect(() => {
        console.log(user)
    }, []);
    
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
        console.log(values);

        let { data, error } = await supabase.auth.signInWithPassword({
            email: values.workEmail,
            password: values.password
        });

        console.log({ data, error });
        if (error == null) {
            router.push("/dashboard");
        }

        return data
    }

    return (
        <main className='grid grid-cols-5'>
            <section className='col-span-2 bg-primary relative'>
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

            <section className='h-full flex justify-center flex-col col-span-3 pt-6 bg-offWhite  '>
                <div>
                    <div className='text-center'>
                        <h3 className='text-[#0A0A0C] font-semibold text-[28px]'>
                            Welcome back!
                        </h3>
                        <p className='text-[#414143]'>
                            Please login to access your account
                        </p>
                    </div>

                    <div className='mt-10 pb-20'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }: { resetForm: any }) => {
                                onLogin(values);
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
                                                <TextField type="email" name='workEmail' id="workEmail" value={values.workEmail} onChange={handleChange} label="Work email" placeholder='info@business.com' />

                                                <p className='text-xs text-primary'>
                                                    {errors.workEmail && touched.workEmail && errors.workEmail}
                                                </p>
                                            </div>

                                            <div>
                                                <TextField type="password" name='password' id="password" value={values.password} onChange={handleChange} label="Password" placeholder='enter password' />

                                                <p className='text-xs text-primary'>
                                                    {errors.password && touched.password && errors.password}
                                                </p>
                                            </div>

                                            <Button type="submit" className="w-full bg-primary text-white">
                                                Login
                                            </Button>

                                            <p className='text-center'>
                                                Don't have an account yet? <Link className='underline text-primary' href="/register">Register</Link>
                                            </p>

                                            <p className='text-center'>
                                                Forgot Password? <Link className='underline text-primary' href="#">Reset now</Link>
                                            </p>
                                        </Form>

                                    </>
                                )}
                        </Formik>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default page