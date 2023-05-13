"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { storage } from '@/utils/Firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import Cookies from 'js-cookie';
import { useSWRConfig } from "swr"
import { add_new_product } from '@/Services/Admin/product';
 



type Inputs = {
    name: string,
    description: string,
    slug: string,
    feature : Boolean,
    price : Number,
    quantity :  Number,
    categoryID : string,
    image: Array<File>,
}

interface loaderType {
    loader: Boolean
}







const uploadImages = async (file: File) => {
    const createFileName = () => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${file?.name}-${timestamp}-${randomString}`;
    }

    const fileName = createFileName();
    const storageRef = ref(storage, `ecommerce/category/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
            console.log(error)
            reject(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        });
    });
}



const maxSize = (value: File) => {
    const fileSize = value.size / 1024 / 1024;
    return fileSize < 1 ? false : true
}


type CategoryData = {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    categorySlug: string;
    createdAt: string;
    updatedAt: string;
};


interface userData {
    email: String,
    role: String,
    _id: String,
    name: String
  }
  


export default function AddProduct() {

    const [loader, setLoader] = useState(false)
    const Router = useRouter();
    const category =  useSelector((state : RootState) => state.Admin.category) as CategoryData[] | undefined

    useEffect(() => {
        const user: userData | null = JSON.parse(localStorage.getItem('user') || '{}');
        if (!Cookies.get('token') || user?.role !== 'admin') {
            Router.push('/')
        }
        
    }, [  Router])

    





    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });

    const onSubmit: SubmitHandler<Inputs> = async data => {
        setLoader(true)
        const CheckFileSize = maxSize(data.image[0]);
        if (CheckFileSize) return toast.error('Image size must be less then 1MB')
        const uploadImageToFirebase = await uploadImages(data.image[0]);
        // const uploadImageToFirebase = 'https://firebasestorage.googleapis.com/v0/b/socialapp-9b83f.appspot.com/o/ecommerce%2Fcategory%2Fimages131.jpg-1683339363348-c4vcab?alt=media&token=f9303ff9-7d34-4514-a53f-832f72814337';

        const finalData = { productName: data.name, productDescription: data.description, productImage: uploadImageToFirebase, productSlug: data.slug , productFeatured  : data.feature , productPrice : data.price , productQuantity : data.quantity , productCategory : data.categoryID}
        const res = await add_new_product(finalData)
        if (res.success) {
            toast.success(res?.message);
            setTimeout(() => {
                Router.push('/Dashboard')
            }, 2000);
            setLoader(false)
        } else {
            toast.error(res?.message)
            setLoader(false)
        }
    }






    return (
        <div className='w-full p-4 min-h-screen  bg-gray-50 flex flex-col '>
            <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
                <ul>
                    <li>
                        <Link href={"/Dashboard"}>
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
                        <p className='text-sm mt-2 font-semibold text-orange-500'>Adding Product Hold Tight ....</p>
                    </div>
                ) : (

                    <div className='w-full h-full flex items-start justify-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg  py-2 flex-col ">
                            <div className="form-control w-full max-w-full">
                                <label className="label">
                                    <span className="label-text">Choose Category</span>
                                </label>
                                <select   {...register("categoryID", { required: true })}  className="select select-bordered">
                                    <option disabled selected>Pick  one category </option>
                                    {
                                        category?.map((item) => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label >
                                <input {...register("name", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.name && <span className='text-red-500 text-xs mt-2'>This field is required</span>}
                            </div >
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Product Slug</span>
                                </label>
                                <input  {...register("slug", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.slug && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Product Price</span>
                                </label>
                                <input  {...register("price", { required: true })} type="number" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.slug && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control w-full mb-2">
                                <label className="label">
                                    <span className="label-text">Product Quantity</span>
                                </label>
                                <input  {...register("quantity", { required: true })} type="number" placeholder="Type here" className="input input-bordered w-full" />
                                {errors.slug && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea  {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                                {errors.description && <span className='text-red-500 text-xs mt-2'>This field is required</span>}

                            </div>
                            <div className="form-control py-2">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Featured Product</span>
                                    <input {...register("feature")} type="checkbox"  className="checkbox" />
                                </label>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Add product Image</span>
                                </label>
                                <input accept="image/*" max="1000000"  {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                                {errors.image && <span className='text-red-500 text-xs mt-2'>This field is required and the image must be less than or equal to 1MB.</span>}

                            </div>

                            <button className='btn btn-block mt-3'>Done !</button>

                        </form >
                    </div >

                )
            }

            <ToastContainer />
        </div >
    )
}

