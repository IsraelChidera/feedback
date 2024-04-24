import Container from '@/components/Container';
import Image from 'next/image';
import { GiBookshelf } from "react-icons/gi";
import { RiDownload2Fill } from "react-icons/ri";
import { TbPresentationAnalytics } from "react-icons/tb";

const Features = () => {
    return (
        <section className='mt-24'>
            <Container>
                <div className='text-center'>
                    <h2 className=' font-medium text-[#393939] text-[36px]'>
                        <span className='text-primary'>Features</span>
                    </h2>
                    <p className='text-[#6C6C6C] '>
                        Explore the Benefits of Our All-in-One Solution
                    </p>
                </div>


                <div className='mt-6 md:mt-10 md:grid grid-cols-3 gap-x-4 md:space-y-0 space-y-8'>
                    <div className='text-center'>
                        <div className='flex items-center justify-center'>
                            <GiBookshelf className='text-5xl md:text-3xl text-primary' />
                        </div>
                        <p className='text-lg mt-3'>Feedback Submission</p>
                    </div>

                    <div className='text-center'>
                        <div className='flex items-center justify-center'>
                            <RiDownload2Fill className='text-5xl md:text-3xl text-primary' />
                        </div>

                        <p className='text-lg mt-3'>Feedback Downloads</p>
                    </div>

                    <div className='text-center'>
                        <div className='flex items-center justify-center'>
                            <TbPresentationAnalytics className='text-5xl md:text-3xl text-primary' />
                        </div>

                        <p className='text-lg mt-3'>Analytics and Reporting</p>
                    </div>
                </div>

            </Container>
        </section>
    )
}

export default Features