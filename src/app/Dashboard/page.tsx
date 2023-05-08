"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import SuperComponent from '@/components/SuperComponent';
import { ToastContainer, toast } from 'react-toastify';
import useSWR from 'swr'
import { get_all_categories } from '@/Services/Admin/category';
import { useDispatch } from 'react-redux';
import { setCatLoading, setCategoryData } from '@/utils/AdminSlice';
import Loading from '../loading';
import { setNavActive } from '@/utils/AdminNavSlice';


interface userData {
  email: String,
  role: String,
  _id: String,
  name: String
}



export default function Dashboard() {
  const Router = useRouter();
  const dispatch  = useDispatch();
  
  useEffect(() => {
    const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');
    if (!Cookies.get('token') || user?.role !== 'admin') {
      Router.push('/')
    }
    dispatch(setNavActive('Base'))
  }, [])



  const { data : categoryData , isLoading : categoryLoading } = useSWR('/gettingAllCategoriesFOrAdmin', get_all_categories)
  if (categoryData?.success  !== true) toast.error(categoryData?.message)

  useEffect(() => {
    console.log(categoryData?.data)
   dispatch(setCategoryData(categoryData?.data))
    dispatch(setCatLoading(categoryLoading))
  }, [categoryData , dispatch , categoryLoading])
 


  return (
    <div className='w-full h-screen flex  bg-base-200 overflow-hidden'>
      <AdminSidebar />
      <div className='w-full h-full '>
        <AdminNavbar />
        <div className='w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2'>
          {categoryLoading ? <Loading />: <SuperComponent />}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}




