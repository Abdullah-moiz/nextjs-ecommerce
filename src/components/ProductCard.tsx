import Image from 'next/image'
import React from 'react'
import {BsCartPlus , BsFillBookmarkCheckFill} from 'react-icons/bs'

export default function ProductCard() {
    return (
        <div className="card card-compact m-3 w-80 bg-base-100 shadow-xl relative">
            <div className='w-full rounded relative h-60'>
                <Image src={'/images98.jpg'} alt='no Image' className='rounded' fill/>
            </div>
            
            <div className="card-body">
                <h2 className="card-title">Supplement </h2>
                <p>Help You gain Energy </p>
                <p className='font-semibold'>$ 5000</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-circle btn-ghost "><BsCartPlus className='text-2xl text-orange-600 font-semibold' /></button>
                    <button className="btn btn-circle btn-ghost absolute top-0 right-0 "><BsFillBookmarkCheckFill className='text-2xl text-orange-600 font-semibold' /></button>
                </div>
            </div>
        </div>
    )
}
