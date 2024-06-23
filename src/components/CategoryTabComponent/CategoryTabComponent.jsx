import React, { useState } from 'react'

const CategoryTabComponent = () => {

    const [selected,setSelected] = useState("Icons")

    const categoryData = [
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Icons"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Castle"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "National Parks"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Tree house"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Rooms"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "A-Frames"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Plays"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Breakfast"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Top city "
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Surfing"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "New"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Beach front"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Island"
        },{
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Arctic"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "OMG"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Amazing view"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Top world"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Amazing view"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Camper"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Lake front"
        },
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Camping"
        },


    ]
  return (
    <React.Fragment>
      <div className='no-scrollbar flex items-center px-5 overflow-scroll gap-4 md:gap-6 lg:gap-10'>
        {
            categoryData.map((category) => (
                <div className='flex flex-col items-center w-96 cursor-pointer' onClick={() => {setSelected(category.name)}}>
                    <img src={category.icons} className='h-8'/>
                    <p className='text-xs w-20 text-center'>{category.name}</p>
                    <div className={`bg-gray-800 h-[2px] w-full my-3 mb-4 ${selected === category.name ? "bg-gray-800" : "bg-transparent"}`}></div>
                </div>
            ))
        }
      </div>
    </React.Fragment>
  )
}

export default CategoryTabComponent
