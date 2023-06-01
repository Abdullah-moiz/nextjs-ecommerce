"use client"
import { get_all_orders_of_user } from '@/Services/common/order'
import { RootState } from '@/Store/store'
import OrdersDetailsDataTable from '@/components/OrdersDetailsDataTable'
import { setOrder } from '@/utils/OrderSlice'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { GrDeliver } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

interface userData {
  email: String,
  role: String,
  _id: String,
  name: String
}



export default function Page() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.User.userData) as userData | null




  useEffect(() => {
    const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');
    if (!Cookies.get('token') || !user) {
      Router.push('/')
    }
  }, [Router])


  useEffect(() => {
    fetchOrdersData();
  }, [])

  const fetchOrdersData = async () => {
    if (!user?._id) return Router.push('/')
    const orderData = await get_all_orders_of_user(user?._id)
    if (orderData?.success) {
      dispatch(setOrder(orderData?.data))
    } else {
      toast.error(orderData?.message)
    }
  }




  return (
    <div className='w-full bg-gray-50 h-screen px-2 py-2'>
      <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
        <ul className='dark:text-black'>
          <li>
            <Link href={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              Home
            </Link>
          </li>
          <li>
            <GrDeliver className="w-4 h-4 mr-2 stroke-current" />
            Orders
          </li>
        </ul>
      </div>
      <div className='w-full h-5/6 py-2'>
        <OrdersDetailsDataTable />
      </div>
      <ToastContainer />
    </div>
  )
}
