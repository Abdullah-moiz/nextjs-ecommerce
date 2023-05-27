"use client"

import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsCartCheckFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import { useForm, SubmitHandler } from "react-hook-form";
import { add_new_category } from '@/Services/Admin/category'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/store'
import CartCard from '@/components/CartCard'



type Inputs = {
    fullName: string,
    address: string,
    city: string,
    postalCode: Number,
    country: string,
}





interface userData {
    email: String,
    role: String,
    _id: String,
    name: String
}


type Data = {
    productID: {
        productName: string,
        productPrice: String,
        _id: string,
        productImage: string,
        productQuantity: number,
    }
    userID: {
        email: string,
        _id: string,
    },
    _id: string,
    quantity: number,
}



export default function Page() {


    const [loader, setLoader] = useState(false)
    const Router = useRouter();

    const cartData = useSelector((state: RootState) => state.Cart.cart) as Data[] | null;
    const totalPrice = useSelector((state: RootState) => state.Cart.total) as number

    useEffect(() => {
        toast.warning("This is Dummy Website Don't add your Origial Details Here !")
    }, [])

    useEffect(() => {
        if (!Cookies.get('token')) {
            Router.push('/')
        }

    }, [Router])


    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });

    const onSubmit: SubmitHandler<Inputs> = async data => {
        setLoader(true)

        const finalData = 'hello'
    }

    return (
        <div className='w-full h-full bg-gray-50'>
            <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
                <ul className='dark:text-black'>
                    <li>
                        <Link href={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={"/cart"}>
                            <BsCartCheckFill className="w-4 h-4 mr-2 stroke-current" />
                            Cart
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                        Order
                    </li>
                </ul>
            </div>
            <div className='w-full h-20 my-2 text-center'>
                <h1 className='text-2xl py-2 dark:text-black'>Order Now</h1>
            </div>


            {
                loader ? (
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
                        <p className='text-sm mt-2 font-semibold text-orange-500'>Creating Your Order Hold Tight ....</p>
                    </div>
                ) : (

                    <div className='w-full  h-full flex-col md:flex-row flex items-start justify-center'>

                        <div className='md:w-2/3 w-full px-2 h-full flex-col items-end justify-end flex'>
                            <div className='w-full overflow-auto h-96'>
                                {
                                    cartData?.length === 0 ?
                                        <div className='w-full h-full flex items-center justify-center flex-col'>
                                            <p className='my-4 mx-2 text-lg font-semibold '>No Item Available in Cart</p>
                                            <Link href={"/"} className='btn text-white'>Shop Now</Link>
                                        </div>
                                        :
                                        cartData?.map((item: Data) => {
                                            return <CartCard key={item?._id}
                                                productID={item?.productID}
                                                userID={item?.userID}
                                                _id={item?._id}
                                                quantity={item?.quantity}
                                            />
                                        })
                                }
                            </div>
                            <div className='w-full  py-2 my-2 flex justify-end '>
                                <h1 className='py-2 tracking-widest mb-2  border-b px-6 border-orange-600 text-sm  flex flex-col '>  Original Price  <span className='text-xl font-extrabold'>Rs {totalPrice || 0}</span> </h1>
                                <h1 className='py-2 tracking-widest mb-2  border-b px-6 border-orange-600 text-sm  flex flex-col '>  Shipping Price  <span className='text-xl font-extrabold'>Rs {500}</span> </h1>
                                <h1 className='py-2 tracking-widest mb-2  border-b px-6 border-orange-600 text-sm  flex flex-col '>  tax Price  <span className='text-xl font-extrabold'>Rs {100}</span> </h1>
                            </div>
                            <div className='w-full  py-2 my-2 flex justify-end '>
                                <h1 className='py-2 tracking-widest mb-2  border-b px-6 border-orange-600 text-sm  flex flex-col '>  Total Order Price  <span className='text-xl font-extrabold'>Rs {totalPrice + 600}</span> </h1>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/3 px-2 w-full max-w-lg  py-2 flex-col ">
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label >
                                <input {...register("fullName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.fullName && <span className='text-red-500 text-xs mt-2'>This field is required</span>}
                            </div >
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Your Address</span>
                                </label>
                                <input  {...register("address", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.address && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City</span>
                                </label>
                                <textarea  {...register("city", { required: true })} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                                {errors.city && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Postal Code</span>
                                </label>
                                <input  {...register("postalCode", { required: true })} type="number" className="file-input file-input-bordered w-full " />
                                {errors.postalCode && <span className='text-red-500 text-xs mt-2'>This field is required and the image must be less than or equal to 1MB.</span>}

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Country</span>
                                </label>
                                <input  {...register("country", { required: true })} type="number" className="file-input file-input-bordered w-full " />
                                {errors.country && <span className='text-red-500 text-xs mt-2'>This field is required and the image must be less than or equal to 1MB.</span>}

                            </div>

                            <button className='btn btn-block mt-3'>Order !</button>

                        </form >

                    </div >


                )
            }


            <ToastContainer />
        </div>
    )
}
