import React from 'react'
import Navbar from '@/component/navbar'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'  // React Icon import

function Page() {
  return (
    <div 
      className='bg-cover bg-center h-screen' 
      style={{ backgroundImage: "url('/yaalimadad.jpg')" }}
    >
      <Navbar />
      
      <div className='flex flex-col lg:flex-row justify-around lg:mt-44 font-serif items-center'>
        {/* Text Section */}
        <div className='text-amber-50 text-2xl text-center lg:text-left'>
          Craving something delicious? Foodiya delivers fresh,<br/>
          tasty meals right to your doorstep — fast and easy!
        </div>

        {/* Button Section */}
        <div className='text-2xl text-amber-50 lg:mt-3 bg-amber-500 p-4 rounded hover:text-blue-500 mt-3 flex items-center gap-2'>
          <Link href="/item" className='flex items-center gap-2'>
            <FaShoppingCart /> Place your order
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
