import { add_to_cart } from '@/Services/common/cart';
import { RootState } from '@/Store/store';
import { setUserData } from '@/utils/UserDataSlice';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsCartPlus, BsFillBookmarkCheckFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory: {
        categoryName: string,
        categoryDescription: string,
        _id: string,
    },
    _id: string
};


type User = {
    email : string , 
    name : string , 
    _id : string,
}


export default function ProductCard({ productName, productFeatured, productImage, productCategory, productPrice, _id, productSlug }: ProductData) {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.User.userData) as User | null

    const AddToCart = async () => {
        const finalData = { productID: _id, userID: user?._id }
        const res = await add_to_cart(finalData);
        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.message)
        }
    }


    return (
        <div  className="card text-black cursor-pointer card-compact m-3 w-80 bg-white shadow-xl relative">
            <div onClick={() => router.push(`/product/product-detail/${_id}`)} className='w-full rounded relative h-60'>
                <Image src={productImage || '/images98.jpg'} alt='no Image' className='rounded' fill />
            </div>

            <div className="card-body">
                <h2 className="card-title" onClick={() => router.push(`/product/product-detail/${_id}`)}>{productName} </h2>
                <p className='font-semibold' onClick={() => router.push(`/product/product-detail/${_id}`)}>{`$ ${productPrice}`}</p>
                <div className="card-actions justify-end z-20">
                    <button onClick={AddToCart} className="btn  btn-circle btn-ghost "><BsCartPlus className='text-2xl text-orange-600 font-semibold' /></button>
                    <button className="btn btn-circle btn-ghost absolute top-0 right-0 "><BsFillBookmarkCheckFill className='text-2xl text-orange-600 font-semibold' /></button>
                </div>
            </div>
        </div>
    )
}
