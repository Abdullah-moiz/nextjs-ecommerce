'use client'

import { get_all_cart_Items } from '@/Services/common/cart';
import { RootState } from '@/Store/store';
import CartCard from '@/components/CartCard'
import { setNavActive } from '@/utils/AdminNavSlice';
import Cookies from 'js-cookie';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect  , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import useSWR from 'swr'
import Loading from '../loading';


interface userData {
    email: String,
    role: String,
    _id: String,
    name: String
}


type Data  =  {
    productID : {
        productName : string, 
        productPrice : String ,
        _id: string,
        productImage : string,
        productQuantity : string , 
    }
    userID : {
        email : string , 
        _id :string ,
    },
    _id :string


}



export default function Page() {
    const Router = useRouter();
    const dispatch = useDispatch();
    const user  = useSelector((state : RootState) => state.User.userData ) as userData | null
    const [loading , setLoading] =  useState(true)
    const [data   , setData ] =  useState<Data[] | null> ([])


    useEffect(() => {
        if (!Cookies.get('token') ||  user === null) {
            Router.push('/')
        }
        dispatch(setNavActive('Base'))
    }, [dispatch, Router])


    useEffect(() => {
        fetchCartData();
    },[])

    const fetchCartData  =  async  () => {
        if(!user?._id) return Router.push('/')
        const cartData  =  await get_all_cart_Items(user?._id)
        if(cartData?.success){
            setData(cartData?.data);
        }else{
            toast.error(cartData?.message)
        }
        setLoading(false)
    }


 


    return (
        <div className='w-full h-screen px-5 py-2 bg-gray-50 dark:text-black'>
            <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
                <ul className='dark:text-black'>
                    <li>
                        <Link href={'/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        My Cart
                    </li>
                </ul>
            </div>
            <div className='w-full h-5/6  flex items-start  flex-wrap overflow-auto '>

                {
                    loading ? <Loading /> : 
                    <>
                    {
                        data?.map((item : Data) => {
                            return <CartCard key={item._id}
                            productID={item.productID}
                               userID={item.userID}                  
                               _id = {item._id}
                            />
                        })
                    }
                    </>
                }
            </div>
            <ToastContainer />
        </div>
    )
}
