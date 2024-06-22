import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import logo from "../../assets/airbnb-logo-.png"
import { FaGlobe } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { searchProperty, setSearchProperty } from '../../redux/property/propertySlice';

const NavbarComponent = () => {

  const [formClicked, setFormClicked] = useState(false)
  const [guestClicked, setGuestClicked] = useState(false)
  const [optionsClicked, setOptionsClicked] = useState(false)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [city, setCity] = useState("")
  const [guest, setGuest] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  })
  

  const formRef = useRef(null);
  const guestRef = useRef(null);
  const optionsRef = useRef(null);

  const dispatch = useDispatch()

  const handleClickOutside = (event) => {
    if (
      formRef.current && formRef.current.contains(event.target) &&
      guestRef.current && guestRef.current.contains(event.target) &&
      optionsRef.current && optionsRef.current.contains(event.target)
    ) {
      setFormClicked(false);
      setGuestClicked(false);
      setOptionsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', () => handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = async() => {
    dispatch(searchProperty({city:city, adults:guest.adults, children:guest.children, infants:guest.infants, pets:guest.pets}))
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // Ensure month and day are in double digits (e.g., '05' for May, '01' for 1st)
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${year}-${month}-${day}`;
  };

  const clearSearchStates = () => {
    
  }

  const location = useLocation()
  console.log(location)
 
  return (
    <div className=''>
      <div className='flex justify-between items-center md:items-start px-4 md:px-10 py-10'>

        <Link onClick={() => clearSearchStates()} to={"/"} className='w-[15%] md:w-[15%] lg:w-[20%] flex justify-'>
          <img src={logo} className='w-24'/>
        </Link>

        <div className='w-[70%] md:w-[70%] lg:w-[60%] flex flex-col justify-center items-center gap-4'>
          <div className='hidden md:block'>
            <button><p className='text-lg font-semibold'>Stays</p></button>
            <button><p className='text-lg hover:bg-gray-100 rounded-full p-4 transition ' >Experiences</p></button>
          </div>

          <div className='form flex flex-col items-end '>

            <div onClick={() => setFormClicked((prev) => !prev)} className='md:hidden shadow-custom-light flex items-center gap-4 justify-between w-full px-8 py-2 rounded-full'>
              <div><IoSearch className='text-2xl'/></div>
              <div>
                <p className='text-xs text-gray-500'>Where to?</p>
                <p className='text-xs text-gray-500'>Anywhere | Any week | Add guest</p>
              </div>
            </div>

            

            {
              location.pathname !== "/add/property" &&
              <div className='rounded-full shadow-custom-light md:flex items-center w-full h-16 hidden '>
              <div className='w-[30%] h-full cursor-pointer rounded-full hover:bg-gray-200 transition px-6 flex flex-col justify-center items-start '>
                <p className='text-sm font-medium'>Where</p>
                <input type='text' name='city' placeholder='Search destination' className='bg-inherit focus:outline-none placeholder:text-sm' onChange={(e) => setCity(e.target.value)}/>
              </div>
              <div className='w-[40%] flex items-center h-full'>
                <div className='w-1/2  rounded-full hover:bg-gray-200 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check in</p>
                  {/* <input className='' type='date' name='checkIn' placeholder='Add dates' onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Select a date'} /> */}
                  <input
                    className='text-sm bg-inherit w-full cursor-pointer focus:outline-none placeholder:text-sm'
                    name='checkIn'
                    type="text"
                    value={checkIn}
                    placeholder='Add dates'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={getTodayDate()}
                    max={checkOut}
                  />
                </div>
                <div className='w-1/2  rounded-full hover:bg-gray-200 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check out</p>
                  <input
                    className=' text-sm bg-inherit w-full cursor-pointer focus:outline-none placeholder:text-sm'
                    name='checkOut'
                    type="text"
                    placeholder='Add dates'
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={getTodayDate() && checkIn}
                    value={checkOut}
                  />
                </div>
              </div>
              <div 
                className='w-[30%] flex items-center justify-between cursor-pointer rounded-full hover:bg-gray-200 transition pl-5 pr-1 h-full'
                onClick={() => setGuestClicked((prev) => !prev)}
              >
                <div className=''>
                  <p className='text-sm font-medium'>Who</p>
                  {/* <input className='bg-inherit focus:outline-none' type='text' name='people' placeholder='Add guests'/> */}
                  <p className='text-sm text-gray-400 font-normal'>
                    {guest.adults+guest.children+guest.infants ? <p>{guest.adults+guest.children+guest.infants} people</p> : <p>Add guests</p>}
                  </p>
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
                      <p className='text-white font-medium hidden lg:block'>Search</p>
                    </div>
                  }
                </div>
              </div>
            </div>
            }
            {
              guestClicked && 
              <div ref={guestRef} className='bg-white w-[400px] flex flex-col gap-4 justify-end shadow-custom-light my-3 rounded-3xl px-8 py-6 z-10 fixed top-48'>
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
                      <CiCircleMinus className={`text-4xl ${guest.adults<=0? "text-gray-100 cursor-not-allowed": "text-gray-400 cursor-pointer"}`}/>
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
        

        <div className='w-[15%] md:w-[15%] lg:w-[20%] flex flex-col'>
          <div className=' flex justify-center gap-2 '>
            <button className='font-semibold hover:bg-gray-100 rounded-full py-3 transition px-2 hidden lg:block'>Airbnb your home</button>
            <button className='hidden md:block hover:bg-gray-100 rounded-full py-1 px-3 transition text-xl'><FaGlobe /></button>
            <button className='flex gap-2 items-center justify-end px-3 py-0.5 rounded-full border border-gray-300 hover:shadow-md' onClick={() => setOptionsClicked((prev) => !prev)}>
              <RxHamburgerMenu className='text-lg font-semibold'/>
              <div className='h-6 w-6 rounded-full bg-gray-800 flex justify-center items-center '><p className='text-xs flex text-white font-semibold'>Y</p></div>
            </button>
          </div>
          {
            optionsClicked && 
            <div ref={optionsRef} className='bg-white  rounded-md shadow-custom-light flex flex-col gap-2 my-2 z-10 fixed top-24'>

              <div className='border-b border-gray-300 py-2'>
                <div className='flex  items-center justify-between hover:bg-gray-200 px-2 cursor-pointer'>
                  <p className='py-2 font-light'>2024 Summer release features </p>
                  <p className='bg-airbnb-primaryPink text-white font-semibold p-1 text-xs rounded'>New</p>
                </div>
              </div>

              <div className='py-2 border-b border-gray-300 w-full'>
                <ul className='w-full'>
                  <Link to={"/add/property"} className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer w-full inline-block'>Add your property</Link>
                  <Link to={"/user/wishlist"} className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer w-full inline-block'>Wishlist</Link>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light cursor-pointer'>Trips</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light cursor-pointer'>Stays</li>
                </ul>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light cursor-pointer'>Airbnb your home</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light cursor-pointer'>Account</li>
                </ul>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul>
                  <li className='hover:bg-gray-200 px-2 py-2 font-light cursor-pointer'>Help Center</li>
                  <li className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer'>Logout</li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
      {
        formClicked &&
        <div ref={formRef} className='flex flex-col gap-4 fixed z-10 bg-white left-1/2 transform -translate-x-1/2 right-1/2 top-24 w-3/4 shadow-custom-light px-5 py-3 '>
          <div className='w-full'>
            <p className='text-sm'>Where to?</p>
            <input type='text' className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none placeholder:text-sm' placeholder='Search destination' onChange={(e) => setCity(e.target.value)}/>
          </div>
          <div className='h-full cursor-pointer flex flex-col justify-center'>
            <p className='text-sm'>Check in</p>
            {/* <input className='' type='date' name='checkIn' placeholder='Add dates' onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Select a date'} /> */}
            <input
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none placeholder:text-sm'
              name='checkIn'
              type="text"
              value={checkIn}
              placeholder='Add dates'
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setCheckIn(e.target.value)}
              min={getTodayDate()}
              max={checkOut}
            />
          </div>
          <div className='h-full cursor-pointer flex flex-col justify-center'>
            <p className='text-sm '>Check out</p>
            <input
              className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none placeholder:text-sm'
              name='checkOut'
              type="text"
              placeholder='Add dates'
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setCheckOut(e.target.value)}
              min={getTodayDate() && checkIn}
              value={checkOut}
            />
          </div>
          <div>
            <p>Who's coming</p>
            <div  className='bg-white flex flex-col gap-4 justify-end  '>
                <div className='flex w-full justify-between'>
                  <div>
                    <h6 className='text-sm '>Adults</h6>
                    <p className='text-gray-400 font-normal text-sm'>Ages 13 or Above</p>
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
                    <h6 className='text-sm font-semibold'>Children</h6>
                    <p className='text-gray-400 font-normal text-sm'>Ages 2 to 12</p>
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
                    <h6 className='text-sm'>Infants</h6>
                    <p className='text-gray-400 font-normal text-sm'>Under 2</p>
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
                    <h6 className='text-sm'>Pets</h6>
                    <p className='text-gray-400 font-normal text-sm'>Bringing a service animal</p>
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
          </div>
        </div>
      }
      
    </div>
  )
}

export default NavbarComponent
