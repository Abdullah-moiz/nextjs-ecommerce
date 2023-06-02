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
import { setCatLoading, setCategoryData, setOrderData, setProdLoading, setProductData } from '@/utils/AdminSlice';
import Loading from '../loading';
import { setNavActive } from '@/utils/AdminNavSlice';
import { get_all_products } from '@/Services/Admin/product';
import { get_all_orders } from '@/Services/Admin/order';


interface userData {
  email: String,
  role: String,
  _id: String,
  name: String
}



export default function Dashboard() {
  const Router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');
    if (!Cookies.get('token') || user?.role !== 'admin') {
      Router.push('/')
    }
    dispatch(setNavActive('Base'))
  }, [dispatch, Cookies, Router])



  const { data: categoryData, isLoading: categoryLoading } = useSWR('/gettingAllCategoriesFOrAdmin', get_all_categories)
  if (categoryData?.success !== true) toast.error(categoryData?.message)
  const { data: productData, isLoading: productLoading } = useSWR('/gettingAllProductsFOrAdmin', get_all_products)
  if (productData?.success !== true) toast.error(productData?.message)
  const {data : orderData, isLoading : orderLoading} = useSWR('/gettingAllOrdersForAdmin', get_all_orders)
  if (orderData?.success !== true) toast.error(orderData?.message)

  console.log(orderData?.data)
  useEffect(() => {
    dispatch(setCategoryData(categoryData?.data))
    dispatch(setCatLoading(categoryLoading))
    dispatch(setProductData(productData?.data))
    dispatch(setProdLoading(productLoading))
    dispatch(setOrderData(orderData?.data))
    dispatch(setCatLoading(orderLoading))
  }, [categoryData, dispatch, categoryLoading, productData, productLoading , orderData , orderLoading])



  return (
    <div className='w-full h-screen flex  bg-gray-50 overflow-hidden'>
      <AdminSidebar />
      <div className='w-full h-full '>
        <AdminNavbar />
        <div className='w-full h-5/6  flex flex-wrap items-start justify-center overflow-y-auto  px-4 py-2'>
          {categoryLoading || productLoading ? <Loading /> : <SuperComponent />}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}



