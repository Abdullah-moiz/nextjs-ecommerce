"use client"

import { RootState } from '@/Store/store';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import StatsTiles from '@/components/StatsTiles';
import data from '@/Tiles';

export default function Dashboard() {

  return (
    <div className='w-full h-screen flex  bg-base-200'>
      <AdminSidebar />
      <div className='w-full h-full '>
        <AdminNavbar />
        <div className='w-full h-3/4  flex flex-wrap  px-4 py-2'>
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


