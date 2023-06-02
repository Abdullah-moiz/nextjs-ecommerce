"use client"

import { setNavActive} from '@/utils/AdminNavSlice'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AdminNavbar() {
    const router =  useRouter();
    const dispatch =  useDispatch();


    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.clear();
        location.reload();
    }

    return (
        <div className="navbar dark:text-black bg-white">
            <div className="flex-1">
                <div className="dropdown md:hidden">
                    <label tabIndex={0} className="btn btn-active btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-gray-50 rounded-box w-52">
                        <li onClick={() => dispatch(setNavActive('Base'))}><button >Homepage</button></li>
                        <li onClick={() => dispatch(setNavActive('activeCategories'))}><button >Categories</button></li>
                        <li onClick={() => dispatch(setNavActive('activeProducts'))}><button >Products</button></li>
                        <li ><Link href={"/product/add-product"}>Add Products</Link></li>
                        <li><Link href={"/category/add-category"}>Add Category</Link></li>
                        <li onClick={() => dispatch(setNavActive('activePendingOrder'))}><button >Pending orders</button></li>
                        <li onClick={() => dispatch(setNavActive('activeDeliveredOrder'))}><button >Completed orders</button></li>
                    </ul>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 relative rounded-full">
                            <Image className='rounded-full' fill alt='none' src="/profile.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-50 rounded-box w-52">
                        <li>
                            <Link href={"/Dashboard"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li onClick={handleLogout}><button> Logout </button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
