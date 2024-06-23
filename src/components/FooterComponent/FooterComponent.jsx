import React from 'react'
import { FaGlobe } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <React.Fragment>
      <div className='bg-white flex items-start md:items-center justify-between border-t border-gray-200 px-3 md:px-10 py-3 md:fixed bottom-0 w-full bg-10 z-20'>
        <div className='md:flex items-center gap-3'>
            <p className='md:text-sm lg:text-base flex items-center gap-1'><FaRegCopyright />2024 Airbnb,Inc.</p><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base hover:underline cursor-pointer transition'>Privacy</p><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base hover:underline cursor-pointer transition'>Terms</p><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base hover:underline cursor-pointer transition'>Sitemap</p><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base hover:underline cursor-pointer transition'>Company details</p>
        </div>
        <div className='md:flex items-center gap-3 '>
            <div className='md:text-sm lg:text-base flex items-center gap-2 hover:underline cursor-pointer'><FaGlobe />English (IN)</div><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base hover:underline cursor-pointer'>₹ INR</p><p className='hidden md:block'>|</p>
            <p className='md:text-sm lg:text-base flex items-center gap-2 hover:underline cursor-pointer'>Support & resources<BsChevronDown /></p>
        </div>
      </div>

    </React.Fragment>
  )
}

export default FooterComponent
