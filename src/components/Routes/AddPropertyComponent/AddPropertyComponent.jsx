import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Link } from 'react-router-dom';
import broken from "../../../assets/broken.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPropertyComponent = () => {

    const [propertyData, setPropertyData] = useState({
        propertyName:"",
        propertyType:"",
        address:{
            city: "",
            pincode: "",
            town:"",
            street:"",
            doorNo:""
        },
        accomodationCapacity:{
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        },
        about: "",
        bedrooms: 0,
        bathrooms: 0,
        beds: 0,
        balconies: 0,
        area: "",
        images:[],
        pricePerNight:0
    })
    const [userData, setUserData] = useState({})
    const [userToken, setUserToken] = useState("")

    const onChangeHandler = (event) => {
        setPropertyData((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    const formData = new FormData();
    formData.append('propertyName', propertyData.propertyName);
    formData.append('propertyType', propertyData.propertyType);

    formData.append("address[city]", propertyData.address.city);
    formData.append("address[pincode]", propertyData.address.pincode);
    formData.append("address[town]", propertyData.address.town);
    formData.append("address[street]", propertyData.address.street);
    formData.append("address[doorNo]", propertyData.address.doorNo);

    formData.set('accomodationCapacity[adults]', propertyData.accomodationCapacity.adults)
    formData.append('accomodationCapacity[children]', propertyData.accomodationCapacity.children);
    formData.append('accomodationCapacity[infants]', propertyData.accomodationCapacity.infants);
    formData.append('accomodationCapacity[pets]', propertyData.accomodationCapacity.pets);

    formData.append('about', propertyData.about);
    formData.append('bedrooms', propertyData.bedrooms);
    formData.append('bathrooms', propertyData.bathrooms);
    formData.append('beds', propertyData.beds);
    formData.append('balconies', propertyData.balconies);
    formData.append('area', propertyData.area);
    formData.append('pricePerNight', propertyData.pricePerNight);

    propertyData.images.forEach((image) => {
    formData.append('images', image);
    });


    const handleSubmit = async(event) => {
        event.preventDefault()
        console.log("form submit")
        console.log(propertyData)
    
        try{
            console.log("farmData"+formData.beds)
            const response =await axios.post("http://localhost:3000/api/v1/property/addNewProperty", formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast("Property added successfully")
            window.location.href = "/"
            console.log(response)
        }
        catch(error) {
            console.log(error)
        }
    }

    const getUserData = async()=> {
        const authToken = window.localStorage.getItem('airbnbToken')
        if(authToken){
            setUserToken(authToken)
            const response = await axios.post("http://localhost:3000/api/v1/user/details", {token: authToken})
            setUserData(response.data)
            console.log("roleeee"+userData.role)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

  return (

    <React.Fragment>
        {/* {
            !userToken &&
            <div>
                <p>Login to continue</p>
                <Link to={"/login"}>Login</Link>
            </div>
        }
        {
            userToken && userData.role !== "admin" && 
            <div>
                <p>You are not an Authorized User</p>
                <Link to={"/"}>Return to Home</Link>
            </div>
        } */}
        {
            <div className='flex flex-col items-center'>
                {
                    (!userToken || (userToken && userData.role && userData.role !== "admin")) && 
                    <img src={broken} className='h-96'/>
                }
                <h1 className='text-2xl'>{!userToken ? "You are not logged in" : (userToken && userData.role && userData.role !== "admin")? "You are not an Authorised User" : null}</h1>
                <Link to={!userToken ? "/login" : (userToken && userData.role && userData.role !== "admin")? "/" : null} className='text-blue-400 underline'>{!userToken ? "Login to continue" : (userToken && userData.role && userData.role !== "admin")? "Return to Home" : null}</Link>
            </div>
        }
        {
            userData.role === "admin" &&
            
            <div className='px-6 md:px-32 lg:px-96 pb-20'>
                <ToastContainer />
                <h1 className='text-2xl font-semibold'>Add your property </h1>
                <form id='formElem' className='py-5 flex flex-col gap-3'>
                    <TextField
                        name='propertyName'
                        value={propertyData.propertyName}
                        className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                        required
                        id="outlined-required"
                        type=""
                        placeholder='Enter name'
                        label="Property Name"
                        onChange={(event) => onChangeHandler(event)}
                    />

                    <TextField
                        name='propertyType'
                        value={propertyData.propertyType}
                        className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                        required
                        id="outlined-required"
                        type=""
                        placeholder='Enter property type'
                        label="Property Type"
                        onChange={(event) => onChangeHandler(event)}
                    />

                    <h2>Address:</h2>
                    <div className='flex flex-col gap-3'>
                        <div className='grid grid-cols-2 gap-3'>
                            <TextField
                                name='doorNo'
                                value={propertyData.address.doorNo}
                                className='border border-black focus:outline-pink-400 focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='Door No.'
                                label="Door No."
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    address: {
                                    ...prev.address,
                                    doorNo: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='street'
                                value={propertyData.address.street}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='Street Name'
                                label="Street Name"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    address: {
                                    ...prev.address,
                                    street: event.target.value
                                    }
                                }));
                                }}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <TextField
                                name='town'
                                value={propertyData.address.town}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='Town'
                                label="Town"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    address: {
                                    ...prev.address,
                                    town: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='city'
                                value={propertyData.address.city}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='City'
                                label="City"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    address: {
                                    ...prev.address,
                                    city: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='pincode'
                                value={propertyData.address.pincode}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='Pincode'
                                label="Pincode"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    address: {
                                    ...prev.address,
                                    pincode: event.target.value
                                    }
                                }));
                                }}
                            />
                        </div>
                    </div>

                    <h2>Accomodation Capacity:</h2>

                    <div className='flex flex-col gap-3 border-b border-gray-00'>
                        <div className='grid grid-cols-4 gap-3'>
                            <TextField
                                name='adults'
                                value={propertyData.accomodationCapacity.adults}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='No. of Adults'
                                label="Adults"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    accomodationCapacity: {
                                    ...prev.accomodationCapacity,
                                    adults: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='children'
                                value={propertyData.accomodationCapacity.children}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='No. of children'
                                label="Children"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    accomodationCapacity: {
                                    ...prev.accomodationCapacity,
                                    children: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='infants'
                                value={propertyData.accomodationCapacity.infants}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='No. of Infants'
                                label="Infants"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    accomodationCapacity: {
                                    ...prev.accomodationCapacity,
                                    infants: event.target.value
                                    }
                                }));
                                }}
                            />
                            <TextField
                                name='children'
                                value={propertyData.accomodationCapacity.pets}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type=""
                                placeholder='No. of Pets'
                                label="Pets"
                                onChange={(event) => {
                                    setPropertyData((prev) => ({
                                    ...prev,
                                    accomodationCapacity: {
                                    ...prev.accomodationCapacity,
                                    pets: event.target.value
                                    }
                                }));
                                }}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <TextField
                                name='bedrooms'
                                value={propertyData.bedrooms}
                                className='border border-black focus:outline-pink-400 focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='Bedrooms'
                                label="Bedrooms"
                                onChange={(event) => onChangeHandler(event)}
                            />
                            <TextField
                                name='bathrooms'
                                value={propertyData.bathrooms}
                                className='border border-black focus:outline-pink-400 focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='Bathrooms'
                                label="Bathrooms"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <TextField
                                name='beds'
                                value={propertyData.beds}
                                className='border border-black focus:outline-pink-400  focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='Beds'
                                label="Beds"
                                onChange={(event) => onChangeHandler(event)}
                            />
                            <TextField
                                name='balconies'
                                value={propertyData.balconies}
                                className='border border-black focus:outline-pink-400 focus:ring-black'
                                required
                                id="outlined-required"
                                type="Number"
                                placeholder='Balconies'
                                label="Balconies"
                                onChange={(event) => onChangeHandler(event)}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <TextField
                            name='area'
                            value={propertyData.area}
                            className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                            required
                            id="outlined-required"
                            placeholder='Area in sq.meter'
                            label="Area in sq.meter"
                            onChange={(event) => onChangeHandler(event)}
                        />
                    </div>

                    <div>
                        <TextField
                            name='about'
                            value={propertyData.about}
                            className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                            required
                            id="outlined-required"
                            placeholder='Write about your property'
                            label="About"
                            onChange={(event) => onChangeHandler(event)}
                        />
                    </div>

                    <div>
                        <TextField
                            name='pricePerNight'
                            value={propertyData.pricePerNight}
                            className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                            required
                            id="outlined-required"
                            placeholder='Price Per Night'
                            label="Price"
                            onChange={(event) => onChangeHandler(event)}
                        />
                    </div>

                    <div className='flex flex-col gap-5'>
                        <label className='text-xl'>Upload Images: </label>
                        <input type='file' multiple 
                        onChange={(event) => {
                            setPropertyData((prev) => ({
                                ...prev,
                                images: [...event.target.files]
                            }));
                            console.log(propertyData.images)
                        } }/>
                    </div>

                    <div className='flex justify-end gap-5'>
                        <button className='rounded-md border-2 border-airbnb-primaryPink px-5 py-1 text-airbnb-primaryPink font-semibold text-lg' type='clear'>Clear</button>
                        <button className='bg-airbnb-primaryPink text-white text-lg px-5 py-1 font-semibold rounded-md' onClick={(event) => handleSubmit(event)} type='submit'>Save</button>
                    </div>

                </form>
            </div>
        }
    </React.Fragment>
  )
}

export default AddPropertyComponent


