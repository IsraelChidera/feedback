import Container from '@/components/Container';
import Image from 'next/image';
import { GiCheckMark } from "react-icons/gi";

export default function WhatWeAre() {
    return (
        <section id='features' className="mt-24 pb-10">
            <Container>
                <div className='lg:grid grid-cols-2 gap-x-10 lg:gap-y-0 gap-y-6'>
                    <div className="lg:flex hidden items-center h-full">
                        <Image src="/feature2.png" height={406} width={576} alt="Lady pointing to the right" />
                    </div>

                    <div>
                        <h2 className='md:text-left text-center font-medium text-[#393939] text-2xl md:text-[36px]'>
                            What Will You <span className='text-primary'>Get</span> ?
                        </h2>
                        <p className='md:text-left text-center text-[#6C6C6C]'>
                            Explore the Benefits of Our All-in-One Solution
                        </p>

                        <div className='mt-4 space-y-8'>
                            <div className='drop-shadow-md bg-white rounded-2xl py-3 px-6'>
                                <div className='flex space-x-4 items-center'>
                                    <div className='bg-primary p-2 rounded-md'>
                                        <GiCheckMark className='text-white text-xl' />
                                    </div>

                                    <div>
                                        <h3 className='text-lg font-semibold text-[#393939]'>
                                            Streamlined Feedback Gathering
                                        </h3>
                                        <p className='text-sm text-[#8D8D8D]'>
                                            Effortlessly gather feedback on all your products
                                            in one central hub. No more scattered notes or
                                            messy spreadsheets
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='drop-shadow-md bg-white rounded-2xl py-3 px-6'>
                                <div className='flex space-x-4 items-center'>
                                    <div className='bg-primary p-2 rounded-md'>
                                        <GiCheckMark className='text-white text-xl' />
                                    </div>

                                    <div>
                                        <h3 className='text-lg font-semibold text-[#393939]'>
                                            Intuitive Organization
                                        </h3>
                                        <p className='text-sm text-[#8D8D8D]'>
                                            Stay organized with our user-friendly interface.
                                            Categorize feedback by product, feature, or
                                            priority to easily track and manage
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='drop-shadow-md bg-white rounded-2xl py-3 px-6'>
                                <div className='flex space-x-4 items-center'>
                                    <div className='bg-primary p-2 rounded-md'>
                                        <GiCheckMark className='text-white text-xl' />
                                    </div>

                                    <div>
                                        <h3 className='text-lg font-semibold text-[#393939]'>
                                            Social Sharing Made Simple
                                        </h3>
                                        <p className='text-sm text-[#8D8D8D]'>
                                            Share valuable insights with your network in
                                            just a few clicks. Amplify your feedback impact
                                            and engage with your audience
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}