"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter()
    const [Scrolled, setScrolled] = useState(false);




    useEffect(() => {
        window.onscroll = () => {
            setScrolled(window.pageYOffset < 30 ? false : true)
            return () => window.onscroll = null
        }
    }, [Scrolled])

    return (
        <div className={`navbar ${Scrolled ? "bg-base-100/70  " : "bg-transparent"}  fixed top-0 left-0 z-50`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-active btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href={'/'}>Homepage</Link></li>
                        <li><Link href={'/'}>Shop</Link></li>
                        <li><Link href={'/Dashboard'}>Dashboard</Link></li>
                    </ul>
                </div>
            </div>
            <div className='navbar-end'>
                <div className="flex-none">
                    <button onClick={() => router.push('/auth/login')} className='btn mx-2'>Login</button>
                </div>
            </div>
        </div>
    )
}
