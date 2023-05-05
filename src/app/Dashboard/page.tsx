"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import StatsTiles from '@/components/StatsTiles';
import data from '@/Tiles';


interface userData {
  email : String, 
  role :String , 
  _id: String,
  name : String
}

export default function Dashboard() {
  const Router = useRouter();
  const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if(!Cookies.get('token') ||  user?.role !== 'admin'){
      Router.push('/')
    }
  },[])

  return (
    <div className='w-full h-screen flex  bg-base-200 overflow-hidden'>
      <AdminSidebar />
      <div className='w-full h-full '>
        <AdminNavbar />
        <div className='w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2'>
          {
            data?.map((tile, index) => {
              return (
                <StatsTiles key={index}
                  Icon={tile.icon}
                  color={tile.color}
                  title={tile.title}
                  count={tile.count} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}


