'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiCartAdd } from 'react-icons/bi'
import { RiBookMarkFill } from 'react-icons/ri'
import { DiCodeigniter } from 'react-icons/di'
import useSWR from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import { get_product_by_id } from '@/Services/Admin/product'
import Loading from '@/app/loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Store/store'
import { add_to_cart } from '@/Services/common/cart'
import { setUserData } from '@/utils/UserDataSlice'
import { bookmark_product } from '@/Services/common/bookmark'


interface pageParam {
    id: string
}


type ProductData = {
    _id: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productQuantity: Number,
    productFeatured: Boolean,
    productCategory: {
        categoryName: string,
        _id: string,
    },
    createdAt: string;
    updatedAt: string;
};

type User = {
    email: string,
    name: string,
    _id: string,
}

export default function Page({ params, searchParams }: { params: pageParam, searchParams: any }) {
    const dispatch = useDispatch();
    const [prodData, setprodData] = useState<ProductData | undefined>(undefined);
    const user = useSelector((state: RootState) => state.User.userData) as User | null
    const { data, isLoading } = useSWR('/gettingProductbyID', () => get_product_by_id(params.id))
    if (data?.success !== true) toast.error(data?.message)


    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) return;
        dispatch(setUserData(JSON.parse(userData)));
    }, [])

    useEffect(() => {
        setprodData(data?.data)
    }, [data])




    const AddToCart = async () => {
        const finalData = { productID: params.id, userID: user?._id }
        const res = await add_to_cart(finalData);
        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.message)
        }
    }


    const AddToBookmark = async () => {
        const finalData = { productID: params.id, userID: user?._id }
        const res = await bookmark_product(finalData);
        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.message)
        }
    }


    return (
        <div className='w-full h-full dark:text-black lg:h-screen bg-gray-200 py-4 px-2'>
            <div className="text-sm breadcrumbs  border-b-2 py-2 px-2 border-b-orange-600">
                <ul>
                    <li>
                        <Link href={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={`/category/category-product/${prodData?.productCategory?._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            {prodData?.productCategory?.categoryName || "Loading Category Name"}
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        {prodData?.productName || "Loading Product Name"}
                    </li>
                </ul>
            </div>
            <div className='w-full   h-full lg:h-4/5 py-4 px-4 flex items-center justify-center'>
                {
                    isLoading ?
                        <div className='w-4/5 bg-gray-100 rounded-xl h-4/5 flex items-center justify-center shadow-2xl '>
                            <Loading />
                        </div>
                        :
                        <div className='lg:w-4/5 w-full h-full  bg-gray-100 rounded-xl lg:h-4/5 flex flex-col lg:flex-row items-center justify-center shadow-2xl  '>
                            <div className='lg:w-4/12 w-full h-60  lg:h-full  rounded-xl z-10 relative'>
                                <Image src={prodData?.productImage || '/images98.jpg'} alt='no image' fill className='rounded-xl' />
                            </div>
                            <div className='lg:w-8/12 w-full px-3 h-full  rounded flex flex-col lg:px-5 py-2'>
                                <div className='flex flex-col  lg:flex-row md:justify-between w-full md:h-20 py-2 items-center'>
                                    <h1 className='text-3xl font-semibold text-black'>{prodData?.productName}</h1>
                                    {
                                        prodData?.productFeatured &&
                                        <p className='px-3 py-2 bg-orange-600 hidden lg:flex font-semibold tracking-widest rounded text-white  items-center justify-center '>
                                            <DiCodeigniter className='mx-2' />
                                            Featured Product
                                        </p>
                                    }
                                </div>
                                <p className=' py-2   lg:h-40 w-full'>
                                    {prodData?.productDescription} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, blanditiis.
                                </p>
                                <h1 className='text-3xl font-semibold text-black py-2'>$ {`${prodData?.productPrice}`}</h1>
                                <div className='w-full py-2 lg:flex-row flex-col flex '>
                                    <button onClick={AddToCart} className='btn m-2 lg:w-52 h-10 btn-outline btn-success flex items-center justify-center'> <BiCartAdd className='text-3xl mx-2' /> Add to Cart</button>
                                    <button onClick={AddToBookmark} className='btn m-2  lg:w-52 h-10 btn-outline btn-success flex items-center justify-center'> <RiBookMarkFill className='text-3xl mx-2' />Bookmark</button>
                                </div>

                            </div>
                        </div>
                }


            </div>
            <ToastContainer />
        </div>
    )
}
