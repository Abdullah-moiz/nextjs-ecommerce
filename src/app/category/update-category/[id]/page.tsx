"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import {  get_category_by_id, update_a_category } from '@/Services/Admin/category';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setNavActive } from '@/utils/AdminNavSlice';


type Inputs = {
    _id : string,
    name: string,
    description: string,
    slug: string,
}


type CategoryData = {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    categorySlug: string;
    createdAt: string;
    updatedAt: string;
};




  




interface pageParam {
    id: string
}

export default function Page({ params, searchParams }: { params: pageParam, searchParams: any }) {


    const [loader, setLoader] = useState(false)
    const Router = useRouter();
    const dispatch = useDispatch();
    const [catData, setCatData] = useState<CategoryData | undefined>(undefined);


    const { data, isLoading } = useSWR('/gettingAllCategoriesFOrAdmin', () => get_category_by_id(params.id))
    if (data?.success !== true) toast.error(data?.message)

    useEffect(() => {
        setCatData(data?.data)
    }, [data])


    const { register, setValue, formState: { errors }, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });


    const setValueofFormData = () => {
        if (catData) {
            setValue('name', catData?.categoryName)
            setValue('description', catData?.categoryDescription)
            setValue('slug', catData?.categorySlug)
        }
    }

    useEffect(() => {
        if (catData) setValueofFormData();
    }, [catData])

    const onSubmit: SubmitHandler<Inputs> = async data => {
        setLoader(false)


        const updatedData: Inputs = {
            _id : params.id,
            name: data.name !== catData?.categoryName ? data.name : catData?.categoryName,
            description: data.description !== catData?.categoryDescription ? data.description : catData?.categoryDescription,
            slug: data.slug !== catData?.categorySlug ? data.slug : catData?.categorySlug,
        };

        const res = await update_a_category(updatedData)
        if (res?.success) {
            toast.success(res?.message);
            dispatch(setNavActive('Base'))
            setTimeout(() => {
                Router.push("/Dashboard")
            }, 2000);
            setLoader(false)
        } else {
            toast.error(res?.message)
            setLoader(false)
        }
    }







    return (
        <div className='w-full p-4 min-h-screen  bg-gray-50 flex flex-col '>
            <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
                <ul>
                    <li onClick={() => dispatch(setNavActive('Base')) }>
                        <Link href={'/Dashboard'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Update Category
                    </li>
                </ul>
            </div>
            <div className='w-full h-20 my-2 text-center'>
                <h1 className='text-2xl py-2 '>Update Category</h1>
            </div>
            {
                isLoading || loader ? (
                    <div className='w-full  flex-col h-96 flex items-center justify-center '>
                        <TailSpin
                            height="50"
                            width="50"
                            color="orange"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                        <p className='text-sm mt-2 font-semibold text-orange-500'>updating Category Hold Tight ....</p>
                    </div>
                ) : (

                    <div className='w-full h-full flex items-start justify-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg  py-2 flex-col ">
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Category Name</span>
                                </label >
                                <input    {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.name && <span className='text-red-500 text-xs mt-2'>This field is required</span>}
                            </div >
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Category Slug</span>
                                </label>
                                <input  {...register("slug")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.slug && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category Description</span>
                                </label>
                                <textarea  {...register("description")} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                                {errors.description && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            {
                                catData && (

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Old Image</span>
                                        </label>
                                        <Image src={catData?.categoryImage || ""} alt='No Image Found' width={200} height={200} />

                                    </div>
                                )
                            }

                            <button className='btn btn-block mt-3'>Done !</button>

                        </form >
                    </div >

                )
            }

            <ToastContainer />
        </div >
    )
}


