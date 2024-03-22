'use client'

import DashboardMain from '@/components/widget/DashboardMain'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const page = () => {

  return (
    <main>
      <DashboardMain />
    </main>
  )
}

export default page