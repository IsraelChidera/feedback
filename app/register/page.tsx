import React from 'react'
import Container from '@/components/Container';
import Button from '@/components/Button';
import TextField from '@/components/Forms/TextField';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
    return (
        <main className='grid grid-cols-5'>
            <section className='col-span-2 bg-primary relative'>
                <Container>
                    <div className='mt-10'>
                        <div className='text-2xl font-semibold text-white'>Feedback</div>

                        <h1 className='text-white font-semibold mt-10 text-[35px] leading-tight'>
                            Welcome to Feedback Form
                            App - Revolutionizing
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
                    <form className='w-[520px] mx-auto space-y-6'>
                        <TextField type="text" label="Business Name" placeholder='Business Name' />

                        <TextField type="email" label="Work email" placeholder='info@business.com' />

                        <TextField type="phone" label="Phone number" placeholder='+234 814 626 5074' />

                        <TextField type="password" label="Password" placeholder='info@business.com' />

                        <div>
                            <input type="checkbox" />
                            <span className='text-sm text-inputText pl-2'>
                                Please exclude me from any future emails regarding Feedback App and related Intuit product and feature updates, marketing best practices, and promotions.
                            </span>
                        </div>

                        <div>
                            <p className='text-inputText'>
                                By registering for an account, you are consenting to our Terms of Service and confirming that you have reviewed and accepted the Global Privacy Statement.
                            </p>
                        </div>

                        <Button className="w-full bg-primary text-white">
                            Get started
                        </Button>

                        <p className='text-center'>
                            Already have an account? <Link className='underline text-primary' href="#">Login</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default page