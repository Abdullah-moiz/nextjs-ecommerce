"use Client"

import React from 'react'
import useSWR from 'swr'
import { toast } from 'react-toastify';
import { get_all_categories } from '@/Services/Admin/category';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Loading from '@/app/loading';




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
  const { data, isLoading } = useSWR('/api/admin/category', get_all_categories)
  if (data?.success  !== true) toast.error(data?.message)


  



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
              <button onClick={() => console.log('hello')} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Update</button>
              <button onClick={() => handleDeleteCategory(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Delete</button>
          </div>
      )
  },

];



  const handleDeleteCategory = (id : string)  => {
    console.log(id)
  }



  return (
    <>
      <DataTable
                columns={columns}
                data={data}
                key={data?._id}
                pagination
                title={`Total Categories : ${data?.length}`}
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
