import React from 'react'
// import logo from "../../assets/airbnb-logo-.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MdOutlineStar } from "react-icons/md";


const PropertyCardCompnent = ({property}) => {
  return (
    <div>
        <div className=''>
        <Carousel showThumbs={false} showStatus={false}>
                {
                    property.images && 
                    property.images.map((image, index) => (
                        <div className='w-full h-72 ' key={index}>
                            <img src={`http://localhost:3000/${image}`} className='w-full h-full object-cover rounded-lg'/>
                        </div>
                    ))
                }
                
            </Carousel>
        </div>
        <div>
            <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold'>{property.propertyType} in {property.address.city}</p>
                {
                    property.ratings && 
                    <div className='flex items-center gap-2'>
                        <MdOutlineStar />
                        {property.ratings}
                        {property.reviews && property.reviews.length}
                    </div>
                }
            </div>
            <p className='text-base text-gray-600'>{property.propertyName}</p>
            <p className='text-base text-gray-600'>{property.beds} beds</p>
            <p className='text-base text-gray-800 font-semibold'>₹{property.pricePerNight}&nbsp;<span className='font-normal'>night</span></p>
        </div>

    </div>
  )
}

export default PropertyCardCompnent
