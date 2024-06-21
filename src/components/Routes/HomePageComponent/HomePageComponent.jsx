import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropertyCardCompnent from '../../PropertyCardComponent/PropertyCardCompnent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPropertyData } from '../../../redux/property/propertySlice'
import PropertiesLoadingComponent from '../../PropertiesLoadingComponent/PropertiesLoadingComponent'

const HomePageComponent = () => {

    // const [propertyData, setPropertyData] = useState([
    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },
    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },

    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },

    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },

    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },

    //   {
    //     propertyType: "Flat",
    //     propertyName: "Bella Vista",
    //     beds: 3,
    //     price: 4300,
    //     guestFavourite: true,
    //     images: ["https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200", "https://a0.muscache.com/im/pictures/miso/Hosting-895597397495104243/original/c6480170-00ad-47d5-a3c2-f1bbb671d29c.jpeg?im_w=1200"]
    //   },
    // ])
    
    // useEffect(() => {
    //     getPropertyData()
    // }, [])

    const getPropertyData = async() => {
        const response = await axios.get("http://localhost:3000/api/v1/property/getAllProperties")
        setPropertyData(response.data)
        console.log(response)
        console.log(response.data)
    }

    const propertyData = useSelector((state => state.property))
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchPropertyData())
    }, [])

    console.log(propertyData)

  return (
    <React.Fragment>
      <div>
      </div>
        {
          propertyData.loading && <div className='w-full'><PropertiesLoadingComponent/></div>
        }
      <div className={`homePropertyRenders px-10 ${propertyData.data.length === 0? "": "grid md:grid-cols-2 lg:grid-cols-4 gap-6"}`}>
        {
          !propertyData.loading && propertyData.data && propertyData.data.length !== 0 ?
            propertyData.data.map((property, index) => (
              <PropertyCardCompnent property={property} key={index} />
            )) :
            !propertyData.loading && (
              <div>
                <p className='text-2xl text-center py-10'>
                  No Properties found
                </p>
              </div>
            )
        }
      </div>
        {
          !propertyData.loading && propertyData.error ?
          <div><p>Error: {propertyData.error}</p></div> : null
        }
        


      
    </React.Fragment>
  )
}

export default HomePageComponent
