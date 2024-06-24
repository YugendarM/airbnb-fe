import React, { useState } from 'react'

const CategoryTabComponent = () => {

    const [selected,setSelected] = useState("Icons")

    const categoryData = [
        {
            icons:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
            name: "Icons"
        },
        {
            icons:"https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
            name: "Castle"
        },
        {
            icons:"https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
            name: "National Parks"
        },
        {
            icons:"https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
            name: "Tree house"
        },
        {
            icons:"https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
            name: "Rooms"
        },
        {
            icons:"https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
            name: "A-Frames"
        },
        {
            icons:"https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
            name: "Plays"
        },
        {
            icons:"https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
            name: "Breakfast"
        },
        {
            icons:"https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
            name: "Top city "
        },
        {
            icons:"https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
            name: "Surfing"
        },
        {
            icons:"https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
            name: "New"
        },
        {
            icons:"https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
            name: "Beach front"
        },
        {
            icons:"https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
            name: "Island"
        },{
            icons:"https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
            name: "Arctic"
        },
        {
            icons:"https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
            name: "OMG"
        },
        {
            icons:"https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
            name: "Amazing view"
        },
        {
            icons:"https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
            name: "Top world"
        },
        {
            icons:"https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
            name: "Amazing view"
        },
        {
            icons:"https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
            name: "Camper"
        },
        {
            icons:"https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
            name: "Lake front"
        },
        {
            icons:"https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
            name: "Camping"
        },


    ]
  return (
    <React.Fragment>
      <div className='no-scrollbar flex items-center px-5 overflow-scroll gap-4 md:gap-6 lg:gap-10 mt-5'>
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
