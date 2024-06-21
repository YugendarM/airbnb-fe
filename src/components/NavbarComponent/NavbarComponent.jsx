import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/airbnb-logo-.png"
import { FaGlobe } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const NavbarComponent = () => {

  const [guestClicked, setGuestClicked] = useState(false)
  const [optionsClicked, setOptionsClicked] = useState(false)
  const [guest, setGuest] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  })

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOptionsClicked(false);
      setGuestClicked(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = () => {
    console.log("handleSearch clicked")
  }
 
  return (
    <React.Fragment>
      <div className='flex justify-between items-start px-10 py-10'>

        <div className='w-[20%] flex justify-'>
          <img src={logo} className='w-24'/>
        </div>

        <div className='w-[60%] flex flex-col justify-center items-center gap-4'>
          <div>
            <button><p className='text-lg font-semibold'>Stays</p></button>
            <button><p className='text-lg hover:bg-gray-100 rounded-full p-4 transition ' >Experiences</p></button>
          </div>

          <div className='form flex flex-col items-end'>
            <div className='rounded-full shadow-custom-light flex items-center w-full h-16'>
              <div className='w-[30%] h-full cursor-pointer rounded-full hover:bg-gray-100 transition px-6 flex flex-col justify-center items-start '>
                <p className='text-sm font-medium'>Where</p>
                <input type='text' name='place' placeholder='Search destination' className='bg-inherit focus:outline-none'/>
              </div>
              <div className='w-[40%] flex items-center h-full'>
                <div className='w-1/2  rounded-full hover:bg-gray-100 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check in</p>
                  {/* <input className='' type='date' name='checkIn' placeholder='Add dates' onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Select a date'} /> */}
                  <input
                    className='bg-inherit w-full cursor-pointer focus:outline-none'
                    name='checkIn'
                    type="text"
                    placeholder='Add dates'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
                <div className='w-1/2  rounded-full hover:bg-gray-100 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check out</p>
                  <input
                    className='bg-inherit w-full cursor-pointer focus:outline-none'
                    name='checkOut'
                    type="text"
                    placeholder='Add dates'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>
              <div 
                className='w-[30%] flex items-center justify-between cursor-pointer rounded-full hover:bg-gray-100 transition pl-6 pr-1 h-full'
                onClick={() => setGuestClicked((prev) => !prev)}
              >
                <div className=''>
                  <p className='text-sm font-medium'>Who</p>
                  {/* <input className='bg-inherit focus:outline-none' type='text' name='people' placeholder='Add guests'/> */}
                  <p className='text-sm text-gray-400 font-normal'>Add guests</p>
                </div>
                <div className='p-4 rounded-full bg-airbnb-primaryPink'>
                  {
                    !guestClicked &&
                    <IoSearch className='text-white text-2xl'/>
                  }
                  {
                    guestClicked && 
                    <div className=' rounded-full bg-airbnb-primaryPink flex items-center gap-1 transition' onClick={()=> handleSearch()}>
                      <IoSearch className='text-white text-xl'/>
                      <p className='text-white font-medium'>Search</p>
                    </div>
                  }
                </div>
              </div>
            </div>
            {
              guestClicked && 
              <div  className='w-[400px] flex flex-col gap-4 justify-end shadow-custom-light my-3 rounded-3xl px-8 py-6 z-10 fixed top-48'>
                <div className='flex w-full justify-between'>
                  <div>
                    <h6 className='text-base font-semibold'>Adults</h6>
                    <p className='text-gray-400 font-normal'>Ages 13 or Above</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button
                     disabled={guest.adults<=0}
                     onClick={() => {setGuest((prev) => ({...prev, adults: prev.adults-1}))}}
                    >
                      <CiCircleMinus className={` text-4xl ${guest.adults<=0? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>
                    </button>
                    <p className='text-lg'>{guest.adults}</p>
                    <button 
                      disabled={guest.adults>=15}
                      onClick={() => {setGuest((prev) => ({...prev, adults: prev.adults+1}))}}
                    >
                      <CiCirclePlus className={` text-4xl ${guest.adults>=15? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>

                    </button>
                  </div>
                </div>

                <div className='bg-gray-300 h-[1px] w-full'></div>

                <div className='flex w-full justify-between'>
                  <div>
                    <h6 className='text-base font-semibold'>Children</h6>
                    <p className='text-gray-400 font-normal'>Ages 2 to 12</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button
                     disabled={guest.children<=0}
                     onClick={() => {setGuest((prev) => ({...prev, children: prev.children-1}))}}
                    >
                      <CiCircleMinus className={` text-4xl ${guest.children<=0? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>
                    </button>
                    <p className='text-lg'>{guest.children}</p>
                    <button 
                      disabled={guest.children>=15}
                      onClick={() => {setGuest((prev) => ({...prev, children: prev.children+1}))}}
                    >
                      <CiCirclePlus className={` text-4xl ${guest.children>=15? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>

                    </button>
                  </div>
                </div>

                <div className='bg-gray-300 h-[1px] w-full'></div>

                <div className='flex w-full justify-between'>
                  <div>
                    <h6 className='text-base font-semibold'>Infants</h6>
                    <p className='text-gray-400 font-normal'>Under 2</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button
                     disabled={guest.infants<=0}
                     onClick={() => {setGuest((prev) => ({...prev, infants: prev.infants-1}))}}
                    >
                      <CiCircleMinus className={` text-4xl ${guest.infants<=0? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>
                    </button>
                    <p className='text-lg'>{guest.infants}</p>
                    <button 
                      disabled={guest.infants>=5}
                      onClick={() => {setGuest((prev) => ({...prev, infants: prev.infants+1}))}}
                    >
                      <CiCirclePlus className={` text-4xl ${guest.infants>=5? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>

                    </button>
                  </div>
                </div>

                <div className='bg-gray-300 h-[1px] w-full'></div>

                <div className='flex w-full justify-between'>
                  <div>
                    <h6 className='text-base font-semibold'>Pets</h6>
                    <p className='text-gray-400 font-normal'>Bringing a service animal</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button
                     disabled={guest.pets<=0}
                     onClick={() => {setGuest((prev) => ({...prev, pets: prev.pets-1}))}}
                    >
                      <CiCircleMinus className={` text-4xl ${guest.pets<=0? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>
                    </button>
                    <p className='text-lg'>{guest.pets}</p>
                    <button 
                      disabled={guest.pets>=5}
                      onClick={() => {setGuest((prev) => ({...prev, pets: prev.pets+1}))}}
                    >
                      <CiCirclePlus className={` text-4xl ${guest.pets>=5? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>

                    </button>
                  </div>
                </div>

              </div>
            }
          </div>
          
        </div>
        

        <div className='w-[20%] flex flex-col'>
          <div className=' flex justify-center gap-2 '>
            <button className='font-semibold hover:bg-gray-100 rounded-full py-3 transition px-2 '>Airbnb your home</button>
            <button className='hover:bg-gray-100 rounded-full py-1 px-3 transition text-xl'><FaGlobe /></button>
            <button className='flex gap-2 items-center justify-end px-3 py-0.5 rounded-full border border-gray-300 hover:shadow-md' onClick={() => setOptionsClicked((prev) => !prev)}>
              <RxHamburgerMenu className='text-lg font-semibold'/>
              <div className='h-6 w-6 rounded-full bg-gray-800 flex justify-center items-center '><p className='text-xs flex text-white font-semibold'>Y</p></div>
            </button>
          </div>
          {
            optionsClicked && 
            <div className='rounded-md shadow-custom-light flex flex-col gap-2 my-2 z-10 fixed top-24'>

              <div className='border-b border-gray-300 py-2'>
                <div className='flex  items-center justify-between hover:bg-gray-200 px-2'>
                  <p className='py-2 font-medium'>2024 Summer release features </p>
                  <p className='bg-airbnb-primaryPink text-white font-semibold p-1 text-xs rounded'>New</p>
                </div>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul>
                  <li className='hover:bg-gray-200 px-2 py-2 font-medium'>Messages</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-medium'>Notification</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-medium'>Trips</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-medium'>WishList</li>
                </ul>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light'>Airbnb your home</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light'>Account</li>
                </ul>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light'>Help Center</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light'>Logout</li>
                </ul>
              </div>
            </div>
          }
        </div>

      </div>
      
    </React.Fragment>
  )
}

export default NavbarComponent
