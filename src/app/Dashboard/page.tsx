"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import SuperComponent from '@/components/SuperComponent';
import { ToastContainer } from 'react-toastify';


interface userData {
  email: String,
  role: String,
  _id: String,
  name: String
}



export default function Dashboard() {
  const Router = useRouter();

  useEffect(() => {
    const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');
    if (!Cookies.get('token') || user?.role !== 'admin') {
      Router.push('/')
    }
  }, [])




 


  return (
    <div className='w-full h-screen flex  bg-base-200 overflow-hidden'>
      <AdminSidebar />
      <div className='w-full h-full '>
        <AdminNavbar />
        <div className='w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2'>
         <SuperComponent />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}


