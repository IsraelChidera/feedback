'use client'

import DashboardMain from '@/components/widget/DashboardMain'
import { UserContext } from '@/store/features/User/UserContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'


const page = () => {

  return (
    <main>
      <DashboardMain />
    </main>
  )
}

export default page