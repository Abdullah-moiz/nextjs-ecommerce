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
    _id: string,
    categoryName: string,
    categorySlug: string
  },
  createdAt: string;
  updatedAt: string;
};



interface Order {
  createdAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: {
    qty: number;
    product: {
      createdAt: string;
      productCategory: string;
      productDescription: string;
      productFeatured: boolean;
      productImage: string;
      productName: string;
      productPrice: number;
      productQuantity: number;
      productSlug: string;
      updatedAt: string;
      __v: number;
      _id: string;
    };
    _id: string;
  }[];
  paidAt: string;
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    fullName: string;
    postalCode: number;
  };
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    password: string;
    role: string;
    __v: number;
    _id: string;
  };
  __v: number;
  _id: string;
}



export default function OrdersDetailsDataTable() {
  const { mutate } = useSWRConfig()
  const router = useRouter();
  const [orderData, setOrderData] = useState<Order[] | []>([]);
  const data = useSelector((state: RootState) => state.Order.order) as Order[] | [];
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Order[] | []>([]);


  useEffect(() => {
    setOrderData(data)
  }, [data])

  useEffect(() => {
    setFilteredData(orderData);
  }, [orderData])







  const columns = [
    {
      name: 'Order ID',
      selector: (row: Order) => row?._id,
      sortable: true,
    },
    {
      name: 'Total Price',
      selector: (row: Order) => row?.totalPrice,
      sortable: true,
    },
    {
      name: 'Delivered',
      selector: (row: Order) => row?.isDelivered ? 'Yes' : 'No',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: Order) => (

        <button onClick={() => router.push("#")} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Details</button>

      )
    },

  ];






  useEffect(() => {
    if (search === '') {
      setFilteredData(orderData);
    } else {
      setFilteredData(orderData?.filter((item) => {
        const itemData = item?._id?.toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }))
    }
  }, [search, orderData])



  return (
    <div className='w-full h-full'>
      <DataTable
        columns={columns}
        data={filteredData || []}
        key={'ThisOrdersData'}
        pagination
        keyField="id"
        title={`Orders list`}
        fixedHeader
        fixedHeaderScrollHeight='700px'
        selectableRows
        selectableRowsHighlight
        persistTableHead
        subHeader
        subHeaderComponent={
          <input className='w-60 dark:bg-transparent py-2 px-2  outline-none  border-b-2 border-orange-600' type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Orders ID"} />
        }
        className="bg-white px-4 h-5/6 "
      />

    </div>
  )
}

