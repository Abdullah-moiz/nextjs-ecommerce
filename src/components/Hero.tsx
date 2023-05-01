import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className='w-full h-screen relative'>
      <Image src={'/intro.jpg'} alt='no Image'  fill/>
    </div>
  )
}
