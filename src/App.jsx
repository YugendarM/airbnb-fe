import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeaderComponent from "../src/components/HeaderComponent/HeaderComponent"
import HomePageComponent from "../src/components/Routes/HomePageComponent/HomePageComponent"
import ProfilePageComponent from "../src/components/Routes/ProfilePageComponent/ProfilePageComponent"
import PropertiesLoadingComponent from './components/PropertiesLoadingComponent/PropertiesLoadingComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import AddPropertyComponent from './components/Routes/AddPropertyComponent/AddPropertyComponent'


const App = () => {
  return (
    <div className=' '>
      <HeaderComponent/>
      <Routes>
            <Route path='/' element={<HomePageComponent/>}/>
            {/* <Route path='/property/:propertyId' element={<HomePageComponent/>}/> */}
            <Route path='/add/property' element={<AddPropertyComponent/>}/>
            <Route path='/profile' element={<ProfilePageComponent/>}/>
        </Routes>
        <FooterComponent/>
    </div>
  )
}

export default App
