'use client'

import Button from '@/components/Button';
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();
  const handleClick = () => {
    router.push("/register")
  }

  return (
    <main>
      Main

      <Button className='bg-primary text-center w-full py-[10px]' onClick={handleClick}>
        Register
      </Button>
    </main>
  );
}
