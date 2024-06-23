import React, { useEffect, useState } from 'react'
// import logo from "../../assets/airbnb-logo-.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MdOutlineStar } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import axios from "axios"



const PropertyCardCompnent = ({property}) => {

    const [wish, setWish] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData()
    }, [])

    const authToken = window.localStorage.getItem("airbnbToken")
    console.log("authtoken from card"+authToken)

    const getUserData = async() => {
        if(authToken){
            const response = await axios.post("http://localhost:3000/api/v1/user/details", {token: authToken})
            // setUserData(response.data)
            if(response.data && response.data.wishlist && response.data.wishlist.includes(property._id)){
                setWish(true)
            }
        }
    }

    

    const handleLike = async() => {
        if(!authToken){
            alert("Redirecting to login page")
            window.location.href = "/login"
        }
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/addPropertyToWishlist", 
                {
                    propertyId : property._id
                },
                {
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                })
            if(response.status === 201){
                alert("Property added to wishlist")
                setWish(true)
            }
        }
        catch(error){
            console.error(error.message)
        }
    }


    const handleDisLike = async() => {
        if(!authToken){
            alert("Redirecting to login page")
            window.location.href = "/login"
        }
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/removePropertyFromWishlist", 
                {
                    propertyId : property._id
                }, 
                {
                    headers:{
                        'Authorization': `Bearer ${authToken}`
                    }
                })
            if(response.status === 200){
                alert("Property removied from wishlist")
                setWish(false)
            }
        }
        catch(error){
            console.error(error.message)
        }
    }

  return (
    <div>
        <div className=''>
        <Carousel showThumbs={false} showStatus={false}>
                {
                    property.images && 
                    property.images.map((image, index) => (
                        <div className='w-full h-72 ' key={index}>
                            <img src={`http://localhost:3000/${image}`} className={`w-full h-full object-cover rounded-lg ${property.available ? "nothing" : "grayscale"}`}/>
                        </div>
                    ))
                }
                
            </Carousel>
        </div>
        <div className='pt-3'>
            <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold'>{property.propertyType} in {property.address && property.address.city}</p>
                <div className='px-2'>
                    {
                        property.available && (wish ? <FaHeart onClick={() => handleDisLike()} className='text-airbnb-primaryPink text-2xl'/> : <FaRegHeart onClick={() => handleLike()} className='text-gray-800 text-3xl pr-1 hover:text-airbnb-primaryPink cursor-pointer'/>)
                    }
                </div>
            </div>
            <p className='text-base text-gray-600'>{property.propertyName}</p>
            <p className='text-base text-gray-600'>{property.beds} beds</p>
            <div className='text-base text-gray-800 font-semibold'>₹{property.pricePerNight}&nbsp;<span className='font-normal'>night</span></div>
        </div>

    </div>
  )
}

export default PropertyCardCompnent
