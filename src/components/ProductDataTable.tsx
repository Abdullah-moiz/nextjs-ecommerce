"use Client"

import React, { useEffect, useState } from 'react'

import { useSWRConfig } from "swr"
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Loading from '@/app/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';
import { delete_a_product } from '@/Services/Admin/product';




type ProductData = {
  _id: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productSlug: string,
  productPrice: Number,
  productQuantity: Number,
  productFeatured: Boolean,
  productCategory: {
    _id :string,
    categoryName :string,
    categorySlug :string
  },
  createdAt: string;
  updatedAt: string;
};


export default function ProductDataTable() {
  const { mutate } = useSWRConfig()
  const router = useRouter();
  const [prodData, setprodData] = useState<ProductData[] | null>(null);
  const data = useSelector((state: RootState) => state.Admin.product)
  const isLoading = useSelector((state: RootState) => state.Admin.productLoading);



  useEffect(() => {
    setprodData(data)
  }, [data])






  const columns = [
    {
      name: 'Name',
      selector: (row: ProductData) => row?.productName,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row: ProductData) => row?.productCategory?.categoryName,
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row: ProductData) => <Image src={row?.productImage} alt='No Image Found' className='py-2' width={100} height={100} />
    },
    {
      name: 'Action',
      cell: (row: ProductData) => (
        <div className='flex items-center justify-start px-2 h-20'>
          <button onClick={() => router.push(`/product/update-product/${row?._id}`)} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Update</button>
          <button onClick={() => handleDeleteProduct(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Delete</button>
        </div>
      )
    },

  ];



  const handleDeleteProduct = async (id: string) => {
    const res = await delete_a_product(id);
    if (res?.success) {
      toast.success(res?.message)
      mutate('/gettingAllProductsFOrAdmin')
    }
    else {
      toast.error(res?.message)
    }
  }



  return (
    <>
      <DataTable
        columns={columns}
        data={prodData || []}
        key={'ThisProductData'}
        pagination
        keyField="id"
        title={`Products list`}
        fixedHeader
        fixedHeaderScrollHeight='600px'
        selectableRows
        selectableRowsHighlight
        persistTableHead
        progressPending={isLoading}
        progressComponent={<Loading />}
        className="bg-white px-4 h-4/5 "
      />

    </>
  )
}

