import React from 'react';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='pt-3'>
            <Container className="flex items-center justify-between">
                <div>
                    <Image width={184} height={48} src="/logo.svg" alt="logo" />
                </div>

                <ul className='flex items-center space-x-6'>
                    <li>
                        <Link href="#">Features</Link>
                    </li>

                    <li>
                        <Link href="#">How it works</Link>
                    </li>
                </ul>

                <div>
                    <Link href="/login" className='rounded-[24px] text-base font-medium bg-primary py-2 px-10 text-white '>
                        Login
                    </Link>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar