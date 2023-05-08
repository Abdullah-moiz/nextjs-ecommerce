"use Client"

import React, { useEffect, useState } from 'react'

import {mutate} from 'swr'
import { toast } from 'react-toastify';
import { delete_a_category } from '@/Services/Admin/category';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Loading from '@/app/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';




type CategoryData = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
};


export default function CategoryDataTable() {
  const router =  useRouter();
  const [catData , setCatData] = useState<CategoryData[] | null>(null);
  const data =  useSelector((state : RootState) => state.Admin.category)
  const isLoading  = useSelector((state : RootState) => state.Admin.catLoading);
 


  useEffect(() => {
    setCatData(data)
  },[data])


  



  const columns = [
    {
        name: 'Name',
        selector: (row: CategoryData) => row?.categoryName,
        sortable: true,
    },
    {
        name: 'Image',
        cell: (row: CategoryData) => <Image src={row?.categoryImage} alt='No Image Found' className='py-2' width={100} height={100}/>
    },
    {
      name: 'Action',
      cell: (row: CategoryData) => (
          <div className='flex items-center justify-start px-2 h-20'>
              <button onClick={() => router.push(`/category/update-category/${row?._id}`)} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Update</button>
              <button onClick={() => handleDeleteCategory(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Delete</button>
          </div>
      )
  },

];



  const handleDeleteCategory = async (id : string)  => {
    const res  =  await delete_a_category(id);
    if(res?.success){
      toast.success(res?.message)
      mutate('/gettingAllCategoriesFOrAdmin')
    }
    else{
      toast.error(res?.message)
    }
  }



  return (
    <>
      <DataTable
                columns={columns}
                data={catData || []}
                key={'ThisisCategoryData'}
                pagination
                title={`Categories list`}
                fixedHeader
                fixedHeaderScrollHeight='100%'
                selectableRows
                selectableRowsHighlight
                persistTableHead
                progressPending={isLoading}
                progressComponent={<Loading />}
                className="bg-white px-4"
            />

    </>
  )
}

