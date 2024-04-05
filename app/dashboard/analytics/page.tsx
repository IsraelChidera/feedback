'use client'

import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';

const page = () => {
    const initialValues = {
        businessname: "",
        fullname: '',
        feedback: "",
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


    const onContactFormSubmission = async (values: any) => {
        console.log({ ...values });

    }
    return (
        <main className='mx-auto w-[98%]'>
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
                                    <Form className='w-[620px] mx-auto space-y-6'>
                                        <TextField
                                            label="id"
                                            id="id"
                                            type="hidden"
                                            placeholder="id"
                                            value={"jgh"}
                                            onChange={handleChange}
                                        />

                                        <TextField
                                            label="Business name"
                                            id="businessname"
                                            type="text"
                                            placeholder="Business name"
                                            value={values.businessname}
                                            onChange={handleChange}
                                        />

                                        <TextField
                                            label="Full name"
                                            id="fullname"
                                            type="text"
                                            placeholder="Full name"
                                            value={values.fullname}
                                            onChange={handleChange}
                                        />

                                        <div>
                                            <label className='block font-medium'>
                                                Feedback
                                            </label>
                                            <textarea
                                                name="feedback"
                                                value={values.feedback}
                                                placeholder="I love the cake. Taste was heavenly"
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

                                        {/* businessname: string,
    feedback: string,
    fullname: string,
    id: any, */}


                                        <Button type="submit" className="w-full bg-primary text-white rounded-[10px]" disable={false}>
                                            Update Feedback
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