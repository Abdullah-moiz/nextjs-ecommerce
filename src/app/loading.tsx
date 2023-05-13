'use client'

import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className='w-full  flex-col min-h-full h-screen flex items-center justify-center '>
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
            <p className='text-sm mt-2 font-semibold text-orange-500'>Loading Hold Tight ....</p>
        </div>
    )
}
