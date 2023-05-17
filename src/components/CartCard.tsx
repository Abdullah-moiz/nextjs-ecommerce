import { delete_a_cart_item } from '@/Services/common/cart'
import Image from 'next/image'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
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


export default function CartCard({ productID, userID, _id }: Data) {
    const { mutate } = useSWRConfig();

    const handleDeleteCartItem = async () => {
        const res = await delete_a_cart_item(_id)
        if (res?.success) {
            mutate('/getCartItemForUsers')
            return toast.success(res?.message)
        }
        return toast.error(res?.message)
    }


    return (
        <div className='bg-white w-full rounded-xl m-2 border-b flex-col md:flex-row h-72  md:h-40 py-2 px-4 flex justify-around items-center'>
            <Image src={productID?.productImage} alt='no image found' width={100} height={150} className='rounded' />
            <h3 className='font-semibold text-lg'>$ {productID?.productPrice}</h3>
            <div className='flex  justify-center items-center'>
                <button className='btn btn-circle dark:text-white  text-xl'>+</button>
                <p className='mx-2 text-xl'>2</p>
                <button className='btn btn-circle dark:text-white  text-xl'>-</button>
            </div>
            <AiFillDelete onClick={handleDeleteCartItem} className="text-red-500 text-2xl cursor-pointer " />
        </div>
    )
}
