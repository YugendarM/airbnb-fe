import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HeaderComponent from "../src/components/HeaderComponent/HeaderComponent"
import HomePageComponent from "../src/components/Routes/HomePageComponent/HomePageComponent"
import PropertiesLoadingComponent from './components/PropertiesLoadingComponent/PropertiesLoadingComponent'
import FooterComponent from './components/FooterComponent/FooterComponent'
import AddPropertyComponent from './components/Routes/AddPropertyComponent/AddPropertyComponent'
import LoginPageCompnent from './components/Routes/LoginPageComponent/LoginPageCompnent'
import WishlistComponent from './components/Routes/WishlistComponent/WishlistComponent'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className=' '>
      <HeaderComponent/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
      />
      <Routes>
            <Route path='/' element={<HomePageComponent/>}/>
            <Route path='/add/property' element={<AddPropertyComponent/>}/>
            <Route path='/login' element={<LoginPageCompnent/>}/>
            <Route path='/wishlist' element={<WishlistComponent/>}/>
        </Routes>
        <FooterComponent/>
    </div>
  )
}

export default App
