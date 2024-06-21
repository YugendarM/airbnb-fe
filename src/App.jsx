import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeaderComponent from "../src/components/HeaderComponent/HeaderComponent"
import HomePageComponent from "../src/components/Routes/HomePageComponent/HomePageComponent"
import ProfilePageComponent from "../src/components/Routes/ProfilePageComponent/ProfilePageComponent"


const App = () => {
  return (
    <div className=' '>
      <HeaderComponent/>
      <Routes>
            <Route path='/' element={<HomePageComponent/>}/>
            {/* <Route path='/property/:propertyId' element={<HomePageComponent/>}/> */}
            <Route path='/profile' element={<ProfilePageComponent/>}/>
        </Routes>
    </div>
  )
}

export default App
