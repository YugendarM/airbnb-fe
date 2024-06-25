import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import logo from "../../assets/airbnb-logo-.png"
import { FaGlobe } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { searchProperty } from '../../redux/property/propertySlice';
import {setUserData} from "../../redux/user/userSlice"
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  const [filteredSearch, setFilteredSearch] = useState([])
  const [userToken, setUserToken] = useState("")
  const [userState, setUserState] = useState({
    userName: "",
    email: "",
    role: ""
  })
  
  const searchData = useSelector((state => state.property))

  ////console.log("search"+searchData.data)
  let cityList = []
  if(!searchData.loading && searchData.data && searchData.data.length !== 0 ){
    cityList = searchData.data.map((data) => {
      return data.address.city
    })  
  }

  ////console.log(cityList)
  

  const formRef = useRef(null);
  const guestRef = useRef(null);
  const optionsRef = useRef(null);
  const dateInputRef = useRef(null)

  // const handleDateClick = () => {
  //   // Focus on the date input field to open the date picker
  //   if (dateInputRef.current) {
  //     dateInputRef.current.focus();
  //   }
  // };

  const dispatch = useDispatch()
  const userData = useSelector((state => state.user))

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
    getUserData()
  }, []);

  const getUserData = async() => {
    const userToken = window.localStorage.getItem("airbnbToken")
    //console.log(userToken)
    setUserToken(userToken)
    if(userToken){
      const response = await axios.post("https://airbnb-be.vercel.app/api/v1/user/details", {token: userToken})
      const {email, userName, role} = response.data
      dispatch(setUserData({email: email, userName: userName, role: role}))
      
    }
  }

  const handleSearch = async() => {
    if(city){
      dispatch(searchProperty({city:city, adults:guest.adults, children:guest.children, infants:guest.infants, pets:guest.pets}))
      toast("Search results found")
    }
    else{
      toast("Enter city to search")
    }
    
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;  
    return `${year}-${month}-${day}`;
  };

  const location = useLocation()

  // const handleSearchChange = (event) => {
  //   setCity(event.target.value)
  //   setFilteredSearch(cityList.filter((data) => {
  //     return data.toLowerCase().includes(city.toLowerCase());
  //   }))
  // }

  const handleSearchChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
    const filteredSearch = cityList.filter((data) => {
      return data.toLowerCase().startsWith(newCity.toLowerCase());
    });
    // Use a Set to ensure only unique values are included
    const uniqueFilteredSearch = [...new Set(filteredSearch)];
    setFilteredSearch(uniqueFilteredSearch);
  }

  const handleLogout = () => {
    localStorage.removeItem('airbnbToken');
    toast("User Logged out successflly")
    window.location.href = "/"
  }

  const searchRef = useRef(null)
  const searchClickHandle = () => {
    setFilteredSearch([...new Set(cityList)])
    if(searchRef.current){
      searchRef.current.focus()
    }
  }




  return (
    <div className=''>
      <div className='flex justify-between items-center md:items-start px-4 md:px-10 py-4'>

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
              location.pathname !== "/add/property" && location.pathname !== "/login" && location.pathname !== "/signup" &&
              <div className='rounded-full shadow-custom-light md:flex items-center w-full h-16 hidden '>
              <div onClick={() => searchClickHandle()} className='w-[30%] h-full cursor-pointer rounded-full hover:bg-gray-200 transition px-6 flex flex-col justify-center items-start '>
                <p className='text-sm font-medium'>Where</p>
                <input 
                ref={searchRef}
                  id='customDatePicker'
                  autoComplete='off' 
                  type='text' name='city' 
                  placeholder='Search destination' 
                  className='bg-inherit focus:outline-none placeholder:text-sm' 
                  onChange={(e) => handleSearchChange(e)}
                  onKeyDown={() => setFilteredSearch([])}
                  value={city}
                />
              </div>
              {
                  filteredSearch.length !==0 && 
                  <div className='fixed flex flex-col items-end top-44 bg-white z-10 shadow-custom-light rounded-xl w-64 py-2'>
                    <div className='px-2' onClick={() => setFilteredSearch([])}><IoClose className='text-2xl cursor-pointer'/></div>
                    <ul className='w-full'>
                      {
                        filteredSearch.map((data,index) => (
                          <li className='py-4 px-5 hover:bg-gray-200 cursor-pointer text-lg' 
                          onClick={() => {
                            setCity(data);
                            setFilteredSearch([])
                          }} 
                          key={index}>{data}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
              
              <div className='w-[40%] flex items-center h-full'>
                <div onClick={() => dateCheckInClickHandle()}  className='w-1/2  rounded-full hover:bg-gray-200 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check in</p>
                  <DatePicker 
                    selected={checkIn}
                    className='w-full bg-inherit focus:outline-none z-50' 
                    placeholderText='Add dates' 
                    minDate={getTodayDate()}
                    dateFormat= {'dd/MM/yyyy'}
                    onChange={(date) => {
                      setCheckIn(date)
                    }}
                  />
                </div>
                <div onClick={() => dateCheckOutClickHandle()} className='w-1/2  rounded-full hover:bg-gray-200 transition px-6 h-full cursor-pointer flex flex-col justify-center'>
                  <p className='text-sm font-medium'>Check out</p>
                  <DatePicker 
                    selected={checkOut}
                    className='w-full bg-inherit focus:outline-none z-20' 
                    placeholderText='Add dates' 
                    minDate={checkIn ? checkIn: getTodayDate()}
                    // shouldCloseOnSelect= {true}
                    dateFormat= {'dd/MM/yyyy'}
                    onChange={(date) => {
                      setCheckOut(date)
                      // setIsOpen(false)
                    }}
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
                  <p className='text-sm text-gray-400 font-normal w-20'>
                    {/* {guest.adults+guest.children+guest.infants ? <span>{guest.adults+guest.children+guest.infants} people</span> : <p>Add guests</p>} */}
                    {guest.adults+guest.children+guest.infants ? guest.adults+guest.children+guest.infants + "people" : "Add guests"}
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
                      <IoSearch className='text-white text-2xl'/>
                      {/* <p className='text-white font-medium hidden lg:block'>Search</p> */}
                    </div>
                  }
                </div>
              </div>
            </div>
            }
            {
              guestClicked && 
              <div ref={guestRef} className='bg-white w-[400px] flex flex-col gap-4 justify-end items-end shadow-custom-light my-3 rounded-3xl px-8 py-6 z-10 fixed top-40'>
                <div className='' onClick={() => setGuestClicked(false)}><IoClose className='text-2xl cursor-pointer'/></div>
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
              <RxHamburgerMenu className='text-lg font-semibold hidden md:block'/>
              <div className='h-6 w-6 rounded-full bg-gray-800 flex justify-center items-center '>
                {
                  userToken ? 
                  <p className='text-xs flex text-white font-semibold'>{userData && userData.data && userData.data.userName && userData.data.userName.substring(0,1).toUpperCase()}</p>
                  : <img src='https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg' className='w-full h-full rounded-full object-cover'  />
                }
              </div>
            </button>
          </div>
          {
            optionsClicked && 
            <div ref={optionsRef} className='bg-white  rounded-md shadow-custom-light flex flex-col gap-2 my-2 z-10 fixed top-16 right-10'>
              <div className='self-end px-2 pt-2' onClick={() => setOptionsClicked(false)}><IoClose className='text-2xl cursor-pointer'/></div>
              <div className='border-b border-gray-300 '>
                <div className='flex  items-center justify-between hover:bg-gray-200 px-2 cursor-pointer gap-6'>
                  <p className='py-2 font-light'>2024 Summer release features </p>
                  <p className='bg-airbnb-primaryPink text-white font-semibold p-1 text-xs rounded'>New</p>
                </div>
              </div>

              <div className='py-2 border-b border-gray-300'>
                <ul className='w-full'>
                  {
                    userToken && userData.data.role === "admin" &&  <Link to={"/add/property"} className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer w-full inline-block'>Add your property</Link>
                  }
                  <Link to={"/wishlist"} className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer w-full inline-block'>Wishlist</Link>
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
                  {
                    !userToken && <Link to={"/login"} className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer w-full inline-block'>Login</Link>
                  }
                  {
                    userToken && <li className='hover:bg-gray-200 px-2 py-2 font-medium cursor-pointer' onClick={() => {handleLogout()}}>Logout</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
      {
        formClicked &&
        <div ref={formRef} className='md:hidden flex flex-col gap-4 fixed z-10 bg-white left-1/2 transform -translate-x-1/2 right-1/2 top-24 w-3/4 shadow-custom-light px-5 py-3 '>
          <div className='self-end px-2 pt-2' onClick={() => setFormClicked(false)}><IoClose className='text-2xl cursor-pointer'/></div>
          <div className='w-full'>
            <p className='text-sm'>Where to?</p>
            <input type='text' className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none placeholder:text-sm' placeholder='Search destination' onChange={(e) => setCity(e.target.value)}/>
            {/* <datalist id="searchList">
              {
                cityList.map((city) => {
                  <option value={city}>{city} C</option>
                })
              }
            </datalist> */}
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

                <div className='bg-gray-300 h-[1px] w-full'></div>

              </div>
          </div>
          <div className='mt-3 md:hidden rounded-full bg-airbnb-primaryPink flex items-center justify-center gap-1 transition py-3' onClick={()=> handleSearch()}>
            <IoSearch className='text-white text-xl'/>
            <p className='text-white font-medium lg:block'>Search</p>
          </div>
        </div>
      }
      
    </div>
  )
}

export default NavbarComponent
