'use client'

import DashboardMain from '@/components/widget/DashboardMain'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/store/features/User/userSlice';

const page = () => {

  return (
    <main>
      <DashboardMain />
    </main>
  )
}

export default page