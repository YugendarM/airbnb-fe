import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropertyCardCompnent from '../../PropertyCardComponent/PropertyCardCompnent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPropertyData, fetchWishlist } from '../../../redux/property/propertySlice'
import PropertiesLoadingComponent from '../../PropertiesLoadingComponent/PropertiesLoadingComponent'
import pear from "../../../assets/pear-home.png"
import { Link } from 'react-router-dom'

const WishlistComponent = () => {

    const propertyData = useSelector((state => state.property))
    const dispatch = useDispatch()

    useEffect(() => {
        const authToken = window.localStorage.getItem("airbnbToken")
        console.log("tokenfrom wishlist"+authToken)
      dispatch(fetchWishlist(authToken))
    }, [])

    let sortedPropertyData = [...propertyData.data]
    sortedPropertyData.sort((a, b) => {
      if (a.available && !b.available) {
          return -1; // 'a' comes before 'b'
      } else if (!a.available && b.available) {
          return 1; // 'b' comes before 'a'
      } else {
          return 0; // No change in order
      }
  });
  return (
    <React.Fragment>
      <div>
        {
          propertyData && propertyData.data.length !==0 && 
          <h1 className='text-2xl font-semibold px-10'>Your Wishlist</h1>
        }
      </div>
        {
          propertyData.loading && <div className='w-full'><PropertiesLoadingComponent/></div>
        }
      <div className={`homePropertyRenders px-10 ${propertyData.data.length === 0? "": "grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-10"}`}>
        {
          !propertyData.loading && propertyData.data && propertyData.data.length !== 0 ?
            sortedPropertyData.map((property, index) => (
              <PropertyCardCompnent property={property} key={index} />
            )) :
            !propertyData.loading && (
              <div className='flex items-center justify-center gap-20'>
                <div className='flex justify-center items-center'>
                  <div className='flex flex-col gap-10'>
                    <h1 className='text-5xl'>Oops!</h1>
                    <h2 className='text-3xl'>No Properties found on wishlist :(</h2>
                    <h4 className='text-2xl'>Go <Link to={"/"} className='text-blue-500 hover:text-blue-400 underline'>Home</Link> to explore Properties</h4>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <img src={pear} className='w-2/3'/>
                </div>
              </div>
            )
        }
      </div>
        {
          !propertyData.loading && propertyData.error ?
          <div><p className='text-lg text-center '>Error: {propertyData.error}</p></div> : null
        }
        


      
    </React.Fragment>
  )
}

export default WishlistComponent
