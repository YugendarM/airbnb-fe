import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropertyCardCompnent from '../../PropertyCardComponent/PropertyCardCompnent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPropertyData } from '../../../redux/property/propertySlice'
import PropertiesLoadingComponent from '../../PropertiesLoadingComponent/PropertiesLoadingComponent'
import pear from "../../../assets/pear-home.png"
import CategoryTabComponent from '../../CategoryTabComponent/CategoryTabComponent'

const HomePageComponent = () => {

    const propertyData = useSelector((state => state.property))
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchPropertyData())
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
        <CategoryTabComponent/>
      </div>
        {
          propertyData.loading && <div className='w-full'><PropertiesLoadingComponent/></div>
        }
      <div className={`homePropertyRenders px-10 pb-20 ${propertyData.data.length === 0? "": "grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-"}`}>
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
                    <h2 className='text-3xl'>No Properties found :(</h2>
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

export default HomePageComponent
