import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps {
  setRatio: (value: number) => void;
}


export default function Hero({setRatio} : IProps) {
  return (
    <div className='w-full h-screen relative'>
      <Image src={'/intro.jpg'} alt='no Image' fill className="w-full h-full object-fill hidden md:block " onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          setRatio(naturalWidth / naturalHeight)
        } />
      <div className='w-full flex-col md:hidden h-full relative flex items-center px-3 justify-center text-center'>
        <Image src={'/mob-intro.jpg'} alt='no image'  fill />

        <h1 className='mb-2 text-xl text-white/90 z-10 font-semibold '>Work hard, lift harder - Get fit, feel fitter with our gear!</h1>
        <Link href={"/#my-Categories"} className='btn btn-ghost border border-orange-600 text-white/90 hover:bg-orange-600  z-40'>Shop Now</Link>


      </div>
    </div>
  )
}
