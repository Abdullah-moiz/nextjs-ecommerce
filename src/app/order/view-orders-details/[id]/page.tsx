"use client"
import { get_order_details } from '@/Services/common/order'
import { RootState } from '@/Store/store'
import Loading from '@/app/loading'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { GrDeliver } from 'react-icons/gr'
import { TbListDetails } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'



interface userData {
    email: String,
    role: String,
    _id: String,
    name: String
}

interface Order {
    createdAt: string;
    deliveredAt: string;
    isDelivered: boolean;
    isPaid: boolean;
    itemsPrice: number;
    orderItems: {
        qty: number;
        product: {
            createdAt: string;
            productCategory: string;
            productDescription: string;
            productFeatured: boolean;
            productImage: string;
            productName: string;
            productPrice: number;
            productQuantity: number;
            productSlug: string;
            updatedAt: string;
            __v: number;
            _id: string;
        };
        _id: string;
    }[];
    paidAt: string;
    paymentMethod: string;
    shippingAddress: {
        address: string;
        city: string;
        country: string;
        fullName: string;
        postalCode: number;
    };
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    updatedAt: string;
    user: {
        email: string;
        name: string;
        password: string;
        role: string;
        __v: number;
        _id: string;
    };
    __v: number;
    _id: string;
}

interface pageParam {
    id: string
}




export default function Page({ params, searchParams }: { params: pageParam, searchParams: any }) {
    const Router = useRouter();

    const user = useSelector((state: RootState) => state.User.userData) as userData | null
    const [orderData, setOrderData] = useState<Order | null>()
    const [loading, setLoading] = useState(true);

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
        const orderData = await get_order_details(params?.id)
        if (orderData?.success) {
            console.log(orderData?.data)
            setOrderData(orderData?.data)
            setLoading(false)
        } else {
            toast.error(orderData?.message)
            setLoading(false)
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
                    <li >
                        <Link href={"/order/view-orders"}>
                            <GrDeliver className="w-4 h-4 mr-2 stroke-current" />
                            Orders
                        </Link>
                    </li>
                    <li >

                        <TbListDetails className="w-4 h-4 mr-2 stroke-current" />
                        Order Details

                    </li>
                </ul>
            </div>
            {
                loading ? <Loading /> :
                    <div className='w-full h-5/6 dark:text-black overflow-y-auto'>
                        <div className='w-full flex px-2 flex-wrap items-center  justify-center'>
                            {/*Order product Card */}
                            {
                                orderData?.orderItems.map((item, index) => {
                                    return (
                                        <div key={index} className='md:w-96 m-2 w-52 h-52 bg-gray-300  flex md:flex-row  flex-col items-center justify-start'>
                                            <div className='relative w-1/2 h-full'>
                                                <Image src={item?.product?.productImage} alt="no Image Found" fill />
                                            </div>
                                            <div className='flex  px-2 py-1 flex-col items-start justify-start'>
                                                <h1 className='my-2'>{item?.product?.productName}</h1>
                                                <p className='text-sm my-2 font-semibold'>Rs {item?.product?.productPrice}</p>
                                                <p className='text-sm  my-2'>Quantity :  <span className='font-semibold'>{item?.qty}</span></p>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/*Order product Card */}
                        </div>
                        <div className='flex flex-wrap w-full items-center justify-center'>

                            <div className=' border m-2 w-96  flex-col flex items-start justify-start py-2 px-4'>
                                <h1 className='text-xl font-semibold '>Shipping Address</h1>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Full Name</p>
                                    <p className='font-semibold'>{orderData?.shippingAddress?.fullName}</p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Address</p>
                                    <p className='font-semibold'>{orderData?.shippingAddress?.address}</p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>City</p>
                                    <p className='font-semibold'>{orderData?.shippingAddress?.city}</p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Postal Code</p>
                                    <p className='font-semibold'>{orderData?.shippingAddress?.postalCode} </p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Country</p>
                                    <p className='font-semibold'>{orderData?.shippingAddress?.country}</p>
                                </div>
                            </div>
                            <div className=' border m-2 w-96  flex-col flex items-start justify-start py-2 px-4'>
                                <h1 className='text-xl font-semibold '>Other Details</h1>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Items Price</p>
                                    <p className='font-semibold'>Rs {orderData?.itemsPrice}</p>
                                </div>

                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Tax Price</p>
                                    <p className='font-semibold'>Rs {orderData?.taxPrice}</p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Total Price</p>
                                    <p className='font-semibold'>Rs {orderData?.totalPrice}</p>
                                </div>
                                <div className='flex py-2 w-full text-sm justify-between'>
                                    <p>Is Paid</p>
                                    <p className='font-semibold'>{orderData?.isPaid ? "Done" : "Pending"}</p>
                                </div>
                            </div>

                        </div>
                    </div>
            }
            <ToastContainer />
        </div>
    )
}
