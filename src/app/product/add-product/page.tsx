import Link from 'next/link'
import React from 'react'

export default function AddProduct() {
    return (
        <div className='w-full  p-4 min-h-screen bg-base-200 flex flex-col '>
            <div className="text-sm breadcrumbs border-b-2 border-b-orange-600">
                <ul>
                    <li>
                        <Link href={'/Dashboard'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Add Product
                    </li>
                </ul>
            </div>
            <div className='w-full h-20 my-2 text-center'>
                <h1 className='text-2xl py-2 '>Add Product</h1>
            </div>
            <div className='w-full h-full flex items-start justify-center'>
                <form className="w-full max-w-lg  py-2 flex-col ">
                    <select className="select  w-full ">
                        <option disabled selected>Choose Product Category</option>
                        <option>Game of Thrones</option>
                        <option>Lost</option>
                        <option>Breaking Bad</option>
                        <option>Walking Dead</option>
                    </select>
                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Product Slug</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control my-2 bg-white border border-gray-200 rounded">
                        <label className="cursor-pointer label">
                            <span className="label-text">Featured Product</span>
                            <input type="checkbox"  className="checkbox " />
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Add Product Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full " />
                    </div>
                    <button className='btn btn-block mt-3'>Done !</button>

                </form>
            </div>

        </div>
    )
}
