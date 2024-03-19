'use client'

import Button from '@/components/Button';
import { useRouter } from 'next/navigation'
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://epayznoyalbgltlcgthm.supabase.co'
// const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwYXl6bm95YWxiZ2x0bGNndGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTQxMDksImV4cCI6MjAyNjQzMDEwOX0.iCJJr9wfwThYxFxGVLwQbs61T82aXle20eeicp5_cM8`
// const supabase = createClient(supabaseUrl, supabaseKey)

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
