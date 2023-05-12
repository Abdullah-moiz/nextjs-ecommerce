'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiCartAdd } from 'react-icons/bi'
import { RiBookMarkFill } from 'react-icons/ri'
import { FaProductHunt } from 'react-icons/fa'
import useSWR from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import { get_product_by_id } from '@/Services/Admin/product'
import Loading from '@/app/loading'


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


export default function Page({ params, searchParams }: { params: pageParam, searchParams: any }) {

    const [prodData, setprodData] = useState<ProductData | undefined>(undefined);
    const { data, isLoading } = useSWR('/gettingProductbyID', () => get_product_by_id(params.id))
    if (data?.success !== true) toast.error(data?.message)

    useEffect(() => {
        setprodData(data?.data)
    }, [data])



    return (
        <div className='w-full h-screen bg-gray-200 py-4 px-2'>
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
            <div className='w-full  h-4/5 py-4 px-4 flex items-center justify-center'>
                {
                    isLoading ?
                        <div className='w-4/5 bg-gray-100 rounded-xl h-4/5 flex items-center justify-center shadow-2xl '>
                            <Loading />
                        </div>
                        :
                        <div className='w-4/5 bg-gray-100 rounded-xl h-4/5 flex items-center justify-center shadow-2xl  '>
                            <div className='w-4/12 h-full  rounded-xl relative'>
                                <Image src={'/images98.jpg'} alt='no image' fill className='rounded-xl' />
                            </div>
                            <div className='w-8/12 h-full  rounded flex flex-col px-5 py-2'>
                                <div className='flex justify-between w-full h-20 items-center'>
                                    <h1 className='text-3xl font-semibold text-black'>{prodData?.productName}</h1>
                                    {
                                        prodData?.productFeatured &&
                                        <p className='px-3 py-2 bg-orange-600 font-semibold tracking-widest rounded text-white flex items-center justify-center '>
                                            <FaProductHunt className='mx-2' />
                                            Featured Product
                                        </p>
                                    }
                                </div>
                                <p className=' py-2  h-40 w-full'>
                                    {prodData?.productDescription} adipisicing elit. Fugit quas veniam eius doloribus, consequatur numquam cum veritatis a eum neque saepe ducimus fugiat nobis. Fugit dolorum, et possimus id eaque corrupti laboriosam labore velit exercitationem ipsam numquam non minima eos?
                                </p>
                                <h1 className='text-3xl font-semibold text-black py-2'>$ {`${prodData?.productPrice}`}</h1>
                                <div className='w-full py-2  flex '>
                                    <button className='btn m-2 w-52 h-10 btn-outline btn-success flex items-center justify-center'> <BiCartAdd className='text-3xl mx-2' /> Add to Cart</button>
                                    <button className='btn m-2  w-52 h-10 btn-outline btn-success flex items-center justify-center'> <RiBookMarkFill className='text-3xl mx-2' />Bookmark</button>
                                </div>

                            </div>
                        </div>
                }


            </div>
            <ToastContainer />
        </div>
    )
}
