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
