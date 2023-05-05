"use client"

import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';


type Inputs = {
    name: string,
    description: string,
    image: File,
    slug: string,
}


export default function AddCategory() {
    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    


    return (
        <div className='w-full p-4 min-h-screen  bg-base-200 flex flex-col '>
            <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
                <ul>
                    <li>
                        <Link href={'/Dashboard'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Add Category
                    </li>
                </ul>
            </div>
            <div className='w-full h-20 my-2 text-center'>
                <h1 className='text-2xl py-2 '>Add Category</h1>
            </div>
            <div className='w-full h-full flex items-start justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg  py-2 flex-col ">
                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Category Name</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        <ErrorMessage errors={errors} name="name" />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => <p>{message}</p>}
                        />
                    </div>
                    <div className="form-control w-full mb-2">
                        <label className="label">
                            <span className="label-text">Category Slug</span>
                        </label>
                        <input {...register("slug")} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        <ErrorMessage errors={errors} name="slug" />
                        <ErrorMessage
                            errors={errors}
                            name="slug"
                            render={({ message }) => <p>{message}</p>}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category Description</span>
                        </label>
                        <textarea {...register("description")} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        <ErrorMessage errors={errors} name="description" />
                        <ErrorMessage
                            errors={errors}
                            name="description"
                            render={({ message }) => <p>{message}</p>}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Add Category Image</span>
                        </label>
                        <input accept="image/png, image/jpeg" max="1000000" {...register("image")} type="file" className="file-input file-input-bordered w-full " />
                        <ErrorMessage errors={errors} name="image" />
                        <ErrorMessage
                            errors={errors}
                            name="image"
                            render={({ message  }) => <p>{message}</p>}
                        />
                    </div>

                    <button className='btn btn-block mt-3'>Done !</button>

                </form>
            </div>

        </div>
    )
}
