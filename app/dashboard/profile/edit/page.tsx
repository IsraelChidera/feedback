"use client"

import React, { useContext } from 'react';
import Button from '@/components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserContext } from '@/store/features/User/UserContext';
import { useRouter } from 'next/navigation';

const page = () => {
    const { userProfile } = useContext(UserContext);

    const router = useRouter();
    const supabase = createClientComponentClient()

    const initialValues = {
        businessname: userProfile[0]?.isprofileupdated ? userProfile[0].businessname : "",
        fullname: userProfile[0]?.isprofileupdated ? userProfile[0].fullname : "",
        country: userProfile[0]?.isprofileupdated ? userProfile[0].country : "",
        phone: userProfile[0]?.isprofileupdated ? userProfile[0].phone : "",
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
            .update({
                // profileid: userProfile[0]?.profileid,
                businessname: values.businessname,
                fullname: values.fullname,
                country: values.country,
                phone: values.phone,
                // isprofileupdated: true
            },)
            .eq('profileid', userProfile[0]?.profileid)
            .select()


        if (!error) {
            alert("You have successfully updated your business profile");
            router.push("/dashboard");
        }
        console.log({ data, error })
    }

    if (!userProfile[0]?.isprofileupdated) {
        return router.push("/dashboard/profile/edit")
    }

    return (
        <section className='mx-auto w-[98%]'>
            <div className="py-6 px-4 w-full bg-white my-3 rounded-[10px]">
                <div>
                    <h3 className='text-center text-primary'>Update Profile</h3>
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
                                                placeholder={userProfile[0]?.isprofileupdated ? userProfile[0]?.fullname : 'Israel Chidera'}
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

                                        <Button
                                            type="submit"
                                            className={`${values.businessname === userProfile[0]?.businessname && values.fullname === userProfile[0]?.fullname && values.country === userProfile[0]?.country ? "w-full bg-primary bg-opacity-60 text-white rounded-[10px]" : "w-full bg-primary text-white rounded-[10px]"}`}
                                            // className=" w-full bg-primary text-white rounded-[10px]"
                                            disable={values.businessname === userProfile[0]?.businessname && values.fullname === userProfile[0]?.fullname && values.country === userProfile[0]?.country}
                                        >
                                            Update
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