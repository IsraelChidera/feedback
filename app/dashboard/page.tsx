import DasboardNav from '@/components/widget/DasboardNav'
import DashboardMain from '@/components/widget/DashboardMain'
import Sidebar from '@/components/widget/Sidebar'
import React from 'react'

const page = () => {
  return (
    <main className='bg-[#EBEBEB] flex relative'>
      <div className='bg-white fixed top-0 left-0 h-screen'>
        <Sidebar />
      </div>

      <div className='relative pl-[330px] w-full'>

        <DasboardNav />
        <DashboardMain />
      </div>
    </main>
  )
}

export default page