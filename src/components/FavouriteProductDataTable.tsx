"use Client"

import React, { useEffect, useState } from 'react'

import { useSWRConfig } from "swr"
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Image from 'next/image';
import Loading from '@/app/loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Store/store';
import { useRouter } from 'next/navigation';
import { delete_a_product } from '@/Services/Admin/product';
import { delete_a_bookmark_item, get_all_bookmark_items } from '@/Services/common/bookmark';
import { setBookmark } from '@/utils/Bookmark';


interface Product {
    productName: string;
    productPrice: string;
    _id: string;
    productImage: string;
    productQuantity: number;
}

interface User {
    email: string;
    _id: string;
}

interface BookmarkItem {
    productID: Product;
    userID: User;
    _id: string;
}



interface userData {
    email: String,
    role: String,
    _id: String,
    name: String
}


export default function FavouriteProductDataTable() {
    const Router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.User.userData) as userData | null
    const [bookmarkData, setBookmarkData] = useState<BookmarkItem[] | []>([]);
    const data = useSelector((state: RootState) => state.Bookmark.bookmark)
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState<BookmarkItem[] | []>([]);


    useEffect(() => {
        setBookmarkData(data)
    }, [data])

    useEffect(() => {
        setFilteredData(bookmarkData);
    }, [bookmarkData])







    const columns = [
        {
            name: 'Product Name',
            selector: (row: BookmarkItem) => row?.productID?.productName,
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row: BookmarkItem) => row?.productID?.productPrice,
            sortable: true,
        },
        {
            name: 'Image',
            cell: (row: BookmarkItem) => <Image src={row?.productID?.productImage} alt='No Image Found' className='py-2' width={100} height={100} />
        },
        {
            name: 'Action',
            cell: (row: BookmarkItem) => (
                <div className='flex items-start justify-start px-2 h-20'>
                    <button onClick={() => handleDeleteProduct(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Delete</button>
                </div>
            )
        },

    ];

    const fetchBookmarkData = async () => {
        if (!user?._id) return Router.push('/')
        const cartData = await get_all_bookmark_items(user?._id)
        if (cartData?.success) {
            dispatch(setBookmark(cartData?.data))
        } else {
            toast.error(cartData?.message)
        }
    }




    const handleDeleteProduct = async (id: string) => {
        const res = await delete_a_bookmark_item(id);
        if (res?.success) {
            toast.success(res?.message)
            fetchBookmarkData()
        }
        else {
            toast.error(res?.message)
        }
    }


    useEffect(() => {
        if (search === '') {
            setFilteredData(bookmarkData);
        } else {
            setFilteredData(bookmarkData?.filter((item) => {
                const itemData = item?.productID?.productName.toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }))
        }


    }, [search, bookmarkData])



    return (
        <div className='w-full h-full'>
            <DataTable
                columns={columns}
                data={filteredData || []}
                key={'ThisProductData'}
                pagination
                keyField="id"
                title={`Favourite Products list`}
                fixedHeader
                fixedHeaderScrollHeight='750px'
                selectableRows
                selectableRowsHighlight
                persistTableHead
                subHeader
                subHeaderComponent={
                    <input className='w-60 dark:bg-transparent py-2 px-2  outline-none  border-b-2 border-orange-600' type={"search"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Product Name"} />
                }
                className="bg-white px-4 h-5/6 "
            />

        </div>
    )
}

