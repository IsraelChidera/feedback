"use client"

import React, { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '@/store/features/User/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ImSpinner8 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';
import { CiCamera } from "react-icons/ci";
import avatar from '../../../components/Assets/Avatar.png';
import { createClient } from '@/app/utils/supabase/client';

const page = () => {
    const { userProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState<any>("/Avatar.png");


    const supabase = createClient()
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

    // if (userProfile[0]?.isprofileupdated) {
    //     return router.push("/dashboard/profile/edit")
    // }





    const onUpload = async (filePath: any) => {
        try {
            setFilePreview(filePath);

            const { data, error: uploadError } = await supabase
                .from('profiles')
                .upsert({
                    avatarurl: filePath,
                    profileid: userProfile.id,
                    businessname: "",
                    fullname: "",
                    country: "",
                    phone: "",
                    isprofileupdated: false
                })
                .select();


            if (uploadError) {
                console.log("check here", uploadError);
                throw uploadError
            }

            toast.success("awesome test")
        }
        catch (error) {
            toast.error("Error uploading avatar")
        }
    }

    const uploadAvatar = async (e: any) => {
        try {
            console.log("file event", e.target.files);
            if (!e.target.files || e.target.files.length === 0) throw Error;

            const file: any = e.target.files[0];
            const fileExt: any = file.name.split('.').pop();
            const fileName: any = `${Math.random()}.${fileExt}`;
            const filePath: any = `${fileName}`;

            console.log("file extr", filePath);

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

            if (uploadError) {
                console.log("error before uploading", uploadError);
                throw uploadError
            }

            onUpload(filePath);
        } catch (error) {
            toast.error("error picking profile avatar")
        }
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

                                        {/* <div className='relative  flex items-center justify-center'>
                                            <div className='flex flex-col justify-center shrink-0 relative z-30'>

                                                <label htmlFor="files" className=" z-50 w-full h-full flex items-end  absolute bottom-0 right-0 cursor-pointer">                                                    
                                                    <div className="bg-primary rounded-full text-white p-0.5">
                                                        <CiCamera />
                                                    </div>
                                                </label>

                                                <img
                                                    src={filePreview}
                                                    className='h-20 w-20 object-cover rounded-full '
                                                    alt="current profile preview"

                                                />

                                                <input
                                                    type="file"
                                                    id="files"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-slate-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-xs file:font-semibold
                                                        file:bg-violet-50 file:text-violet-700
                                                        hover:file:bg-violet-100
                                                    "
                                                    onChange={uploadAvatar}
                                                />
                                            </div>
                                        </div> */}

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