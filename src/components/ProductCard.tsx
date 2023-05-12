import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import {BsCartPlus , BsFillBookmarkCheckFill} from 'react-icons/bs'


type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory : {
        categoryName : string,
        categoryDescription  :string ,
        _id : string,
    },
    _id : string
};
  

export default function ProductCard({productName , productFeatured ,productImage , productCategory , productPrice , _id , productSlug} : ProductData) {
    const router =  useRouter();
    return (
        <div onClick={() => router.push(`/product/product-detail/${_id}`)} className="card cursor-pointer card-compact m-3 w-80 bg-gray-50 shadow-xl relative">
            <div className='w-full rounded relative h-60'>
                <Image src={ productImage || '/images98.jpg'} alt='no Image' className='rounded' fill/>
            </div>
            
            <div className="card-body">
                <h2 className="card-title">{productName} </h2>
                <p className='font-semibold'>{`$ ${productPrice}`}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-circle btn-ghost "><BsCartPlus className='text-2xl text-orange-600 font-semibold' /></button>
                    <button className="btn btn-circle btn-ghost absolute top-0 right-0 "><BsFillBookmarkCheckFill className='text-2xl text-orange-600 font-semibold' /></button>
                </div>
            </div>
        </div>
    )
}
