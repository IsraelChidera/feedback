import Container from '@/components/Container';
import Image from 'next/image';
import { GiCheckMark } from "react-icons/gi";

const Features = () => {
    return (
        <section className='mt-24'>
            <Container>
                <div>
                    <h2 className='font-medium text-[#393939] text-[36px]'>
                        What Will You <span className='text-primary'>Get</span> ?
                    </h2>
                    <p className='text-[#6C6C6C]'>
                        Explore the Benefits of Our All-in-One Solution
                    </p>
                </div>
            </Container>
        </section>
    )
}

export default Features