"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedProduct from '@/components/FeaturedProduct'
import TopCategories from '@/components/TopCategories'
import { get_all_categories } from '@/Services/Admin/category'
import { get_all_products } from '@/Services/Admin/product'
import useSWR from 'swr'
import { toast, ToastContainer } from 'react-toastify'
import { setCategoryData, setCatLoading, setProdLoading, setProductData } from '@/utils/AdminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from './loading'
import { setUserData } from '@/utils/UserDataSlice'
import { RootState } from '@/Store/store'


export default function Home() {
  const dispatch = useDispatch();
  const categoryLoading = useSelector((state: RootState) => state.Admin.catLoading)
  const productLoading = useSelector((state: RootState) => state.Admin.productLoading)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    toast.warning("Application is under development , some features may not work properly")
    toast.warning('This is a demo website, you can not buy anything from here')
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    dispatch(setUserData(JSON.parse(userData)));
  }, [])


  useEffect(() => {
    FetchDataOFProductAndCategory()
  }, [])


  const FetchDataOFProductAndCategory = async () => {

    const categoryData = await get_all_categories();
    if (categoryData?.success !== true) toast.error(categoryData?.message)

    dispatch(setCategoryData(categoryData?.data))



    const productData = await get_all_products();
    if (productData?.success !== true) toast.error(productData?.message)


    dispatch(setProductData(productData?.data))


    setLoading(false)
  }

  useEffect(() => {
    dispatch(setCatLoading(loading))
    dispatch(setProdLoading(loading))
  }, [categoryLoading, productLoading, dispatch, loading])



  return (
    <>
      <Navbar />
      <Hero />
      {
        loading ? <Loading /> :
          <>

            <TopCategories />
            <FeaturedProduct />
            <Footer />

          </>
      }
      <ToastContainer />
    </>
  )
}
