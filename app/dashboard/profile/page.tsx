"use client"

import React, { useContext, useState } from 'react';
import Button from '@/components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserContext } from '@/store/features/User/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ImSpinner8 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';

const page = () => {
    const { userProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient()
    const router = useRouter();
    const initialValues = {
        businessname: "",
        fullname: "",
        country: "",
        phone: "",
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


    console.log("userProfile: qq", userProfile)

    // const checkProfileUpdate = async() => {
    //     let { data: profiles, error } = await supabase
    //     .from('profiles')
    //     .select("*")

    // }

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            return await supabase
                .from('profiles')
                .insert([
                    {
                        profileid: userProfile.id,
                        businessname: values.businessname,
                        fullname: values.fullname,
                        country: values.country,
                        phone: values.phone,
                        isprofileupdated: true
                    },
                ])
                .select();
        },
        onSuccess: () => {
            setLoading(false);

            toast.success("Profile updated successfully");
            router.push("/dashboard");
        },
        onError: () => {
            setLoading(false);
            toast.error("Unable to update profile");
        }

    })

    const onContactFormSubmission = async (values: any) => {
        try {
            setLoading(true);
            console.log(values);           

            await mutation.mutateAsync(values);

        } catch (error) {
            toast.error("Unable to update profile")
        }
    }

    if (userProfile[0]?.isprofileupdated) {
        return router.push("/dashboard/profile/edit")
    }

    return (
        <section className='mt-2 mx-auto w-[98%]'>
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
                                    <Form className='md:w-[620px] mx-auto space-y-6'>

                                        <div>
                                            <label className='block font-medium'>
                                                Full name
                                            </label>
                                            <input type="text"
                                                name="fullname"
                                                value={values.fullname}
                                                placeholder={'Israel Chidera'}
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
                                            {
                                                loading ? <div className="flex items-center justify-center">
                                                    <ImSpinner8 className="text-white animate-spin" />
                                                </div>
                                                    :
                                                    <span>
                                                        Save changes
                                                    </span>
                                            }
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