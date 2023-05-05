import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AdminNavbar() {

    const handleLogout = () => {
        Cookies.remove('token')
        localStorage.removeItem('user')
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <div className="dropdown md:hidden">
                    <label tabIndex={0} className="btn btn-active btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href={'/'}>Homepage</Link></li>
                        <li><Link href={''}>Categories</Link></li>
                        <li><Link href={''}>Products</Link></li>
                        <li><Link href={'/product/add-product'}>Add Products</Link></li>
                        <li><Link href={'/category/add-category'}>Add Category</Link></li>
                        <li><Link href={''}>Pending orders</Link></li>
                        <li><Link href={''}>Completed orders</Link></li>
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
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={''} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li onClick={handleLogout}><Link href={''}>Logout</Link></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
