"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedProduct from '@/components/FeaturedProduct'
import TopCategories from '@/components/TopCategories'
import { get_all_categories } from '@/Services/Admin/category'
import { get_all_products } from '@/Services/Admin/product'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { setCategoryData, setCatLoading, setProdLoading, setProductData } from '@/utils/AdminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from './loading'


export default function Home() {
  const dispatch = useDispatch();
  const { data: categoryData, isLoading: categoryLoading } = useSWR('/gettingAllCategoriesFOrAdmin', get_all_categories)
  if (categoryData?.success !== true) toast.error(categoryData?.message)
  const { data: productData, isLoading: productLoading } = useSWR('/gettingAllProductsFOrAdmin', get_all_products)
  if (productData?.success !== true) toast.error(productData?.message)

  useEffect(() => {
    dispatch(setCategoryData(categoryData?.data))
    dispatch(setCatLoading(categoryLoading))
    dispatch(setProductData(productData?.data))
    dispatch(setProdLoading(productLoading))
  }, [categoryData, dispatch, categoryLoading, productData, productLoading])

  return (
    <>
      {
        categoryLoading || productLoading ? <Loading /> :
          <>
            <Navbar />
            <Hero />
            <TopCategories />
            <FeaturedProduct />
            <Footer />
          </>
      }
    </>
  )
}
