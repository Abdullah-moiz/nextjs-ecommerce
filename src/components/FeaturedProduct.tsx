"use client"

import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { setCategoryData ,setCatLoading , setProdLoading , setProductData } from '@/utils/AdminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { get_all_categories } from '@/Services/Admin/category'
import { get_all_products } from '@/Services/Admin/product'
import { RootState } from '@/Store/store'
import Loading from '@/app/loading'



type ProductData = {
    productName: string,
    productImage: string,
    productSlug: string,
    productPrice: Number,
    productFeatured: Boolean,
    productCategory : {
        categoryName  : string ,
        _id : string
        categoryDescription : string ,
    }
    _id : string
};
  



export default function FeaturedProduct() {
    const dispatch =  useDispatch();

    const prodData = useSelector((state: RootState) => state.Admin.product);
    const prodLoading = useSelector((state: RootState) => state.Admin.productLoading);


    const { data: categoryData, isLoading: categoryLoading } = useSWR('/gettingAllCategoriesFOrAdmin', get_all_categories)
    if (categoryData?.success !== true) toast.error(categoryData?.message)
    const { data: productData, isLoading: productLoading } = useSWR('/gettingAllProductsFOrAdmin', get_all_products)
    if (productData?.success !== true) toast.error(productData?.message)
  
    useEffect(() => {
      dispatch(setCategoryData(categoryData?.data))
      dispatch(setCatLoading(categoryLoading))
      dispatch(setProductData(productData?.data))
      dispatch(setProdLoading(productLoading))
    }, [categoryData, dispatch, categoryLoading , productData , productLoading])


    const FeaturedProducts = prodData?.filter((prod : ProductData) => {
        if(prod?.productFeatured){
            return prod
        }
    })


    const filteredProducts  =  FeaturedProducts?.slice(0, 9)
  
    return (
        <div className='w-full   flex items-center flex-col justify-start'>
            <div className='flex items-center justify-center px-2 py-2 mb-2'>
                <h1 className='py-2 px-4 border-x-2 border-x-orange-500 font-semibold text-2xl '>Top Products</h1>
            </div>
            <div className='md:w-4/5 w-full px-1 h-full py-2 md:px-4 flex items-center justify-center flex-wrap'>
            {
                    prodLoading ? <Loading /> :
                        <>
                            {
                                filteredProducts?.map((item: ProductData) => {
                                    return <ProductCard
                                        productName = {item?.productName}
                                        productPrice = {item?.productPrice}
                                        productFeatured = {item?.productFeatured}
                                        productImage = {item?.productImage}
                                        productCategory={item?.productCategory}
                                        productSlug = {item?.productSlug}
                                        _id={item?._id}
                                        key={item?._id} />
                                })
                            }
                        </>
                }

            </div>
        </div>
    )
}
