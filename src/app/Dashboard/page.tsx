"use client"

import { RootState } from '@/Store/store';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';

export default function Dashboard() {



  return (
    <div className='w-full h-screen flex  bg-base-200'>
      <AdminSidebar />
      <div className='w-full h-full bg-red-500'>
        <AdminNavbar />
      </div>
    </div>
  )
}


