import Image from 'next/image'
import React from 'react'



type CategoryData = {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    categorySlug: string;
};



export default function CategoryCard({ categoryDescription, categoryImage, categoryName, categorySlug, _id }: CategoryData) {
    return (
        <div className="card card-compact m-3 w-80 bg-gray-50 shadow-xl relative">
            <div className='w-full rounded relative h-60'>
                <Image src={categoryImage || '/images98.jpg'} alt='no Image' className='rounded' fill />
            </div>
            <div className="card-body">
                <h2 className="card-title">{categoryName} </h2>
                <p>{categoryDescription}</p>
                <button className='btn btn-wide' >View Products</button>
            </div>
        </div>
    )
}
