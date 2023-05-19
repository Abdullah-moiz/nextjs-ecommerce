"use client"


import { delete_a_cart_item } from '@/Services/common/cart'
import { RootState } from '@/Store/store'
import { setCart } from '@/utils/CartSlice'
import Image from 'next/image'
import React , {useState} from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'

type Data = {
    productID: {
        productName: string,
        productPrice: String,
        _id: string,
        productImage: string,
        productQuantity: string,
    }
    userID: {
        email: string,
        _id: string,
    },
    _id: string


}


export default function CartCard({ productID, userID, _id   }: Data) {
    const { mutate } = useSWRConfig();
    const dispatch  = useDispatch();
    const [qnt, setQnt] = useState(1)
    const cart  =  useSelector((state : RootState) => state.Cart.cart) as Data[] | null

    const handleDeleteCartItem = async () => {
        const res = await delete_a_cart_item(_id)
        if (res?.success) {
            mutate('/getCartItemForUsers')
            return toast.success(res?.message)
        }
        return toast.error(res?.message)
    }

    

    const handleIncrement = () => {
        const newCart = cart?.map((item : Data) => {
            if(item._id === _id){
                return {
                    ...item,
                    productID : {
                        ...item.productID,
                        productQuantity : Number(item.productID.productQuantity) + 1
                    }
                }
            }
            return item
        })
        if (qnt > 0) {
            let quantity = qnt + 1
            setQnt(quantity)
            dispatch(setCart(newCart))
        }
        else {
            setQnt(1)
            dispatch(setCart(newCart))
        }
    }


    const handleDecrement = () => {
        const newCart = cart?.map((item : Data) => {
            if(item._id === _id){
                return {
                    ...item,
                    productID : {
                        ...item.productID,
                        productQuantity : Number(item.productID.productQuantity) + 1
                    }
                }
            }
            return item
        })
        if (qnt > 1) {
            let quantity = qnt - 1
            setQnt(quantity)
            dispatch(setCart(newCart))
        }
        else {
            setQnt(1)
            dispatch(setCart(newCart))
        }
    }


    return (
        <div className='bg-white w-full rounded-xl m-2 border-b flex-col md:flex-row h-72  md:h-40 py-2 px-4 flex justify-around items-center'>
            <Image src={productID?.productImage} alt='no image found' width={100} height={150} className='rounded' />
            <h3 className='font-semibold text-lg'>$ {productID?.productPrice}</h3>
            <div className='flex  justify-center items-center'>
                <button onClick={handleIncrement} className='btn btn-circle dark:text-white  text-xl'>+</button>
                <p className='mx-2 text-xl'>{qnt}</p>
                <button onClick={handleDecrement} className='btn btn-circle dark:text-white  text-xl'>-</button>
            </div>
            <AiFillDelete onClick={handleDeleteCartItem} className="text-red-500 text-2xl cursor-pointer " />
        </div>
    )
}
