"use client"

import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

interface DataRow {
    user: {
      name: string;
      email: string;
    };
    status: string;
  }

export default function CategoryDataTable({}) {
    const [application, setApplication] = useState([]);
    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(application)
    }, [application])




    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])




    const columns = [
        {
            name: 'Name',
            selector: (row: DataRow) => row?.user?.name,
        },
        {
            name: 'Email',
            selector: (row: DataRow) => row?.user?.email,
        },
        {
            name: 'Status',
            selector: (row: DataRow) => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p>,
        },
        {
            name: 'Status',
            selector: (row: DataRow) => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p>,
        },
        {
            name: 'Action',
            cell: (row: DataRow) => (
                <div className='flex items-center justify-start w-72 h-20'>
                    <button onClick={() => console.log('hello')} className=' w-20 py-2 mx-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700'>Details</button>
                    <button onClick={() => console.log('hello')} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>Approved</button>
                    <button onClick={() => console.log('hello')} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>Reject</button>
                </div>
            )
        },

    ];


  
    return (
        <>
            <DataTable
                columns={columns}
                data={filteredData}
                keyField="id"
                pagination
                title={`Total Categories : ${Data?.length}`}
                fixedHeader
                fixedHeaderScrollHeight='79%'
                selectableRows
                selectableRowsHighlight
                subHeader
                persistTableHead
                subHeaderComponent={
                    <input className='w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600' type={"search"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search with Applicant  name..."} />
                }
                className="h-screen bg-white"
            />
        </>
    )
}
