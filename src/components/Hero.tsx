import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className='w-full h-screen relative'>
      <Image src={'/intro.jpg'} alt='no Image' fill className="w-full h-full object-fill hidden md:block " />
      <div className='w-full flex-col md:hidden h-full relative flex items-center px-3 justify-center text-center'>
        <Image src={'/mob-intro.jpg'} alt='no image' fill />

        <h1 className='mb-2 text-xl text-white/90 z-10 font-semibold '>Work hard, lift harder - Get fit, feel fitter with our gear!</h1>
        <button className='btn btn-ghost border border-orange-600 text-white/90 hover:bg-orange-600  z-40'>Shop Now</button>


      </div>
    </div>
  )
}
