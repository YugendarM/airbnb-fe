import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPageCompnent = () => {

    const authToken = window.localStorage.getItem("airbnbToken")

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        setUserCredentials((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async(event) =>{
        event.preventDefault()
        console.log(userCredentials)
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/login", userCredentials)
            console.log(response)
            if(response.status === 200){
                window.localStorage.setItem('airbnbToken', response.data.token)
                // alert("User logged in successfully")
                window.location.href = "/"
                toast("user logged in")
            }
            else {
                alert("Incorrect email or password")
            }
        }
        catch (error) {
            // Check if the error is a network error
            if (!error.response) {
                console.error("Network error:", error.message);
                alert("Network error. Please try again later.");
            } else {
                // Handle HTTP errors
                console.error("Error response:", error.response);
                if(error.response.status === 404){
                    alert("User Not registered")
                }
                else if (error.response.status === 401) {
                    alert("Incorrect password");

                } else {
                    alert("An error occurred. Please try again later.");
                }
            }
        }
    }

  return (
    <React.Fragment>
        {
            !authToken && 
            <div className='w-full md:w-1/2 lg:w-1/4 mx-auto my-auto h-full px-4'>
                <ToastContainer/>
            <h1 className='text-2xl font-semibold text-center py-4'>User Login</h1>
            <form className='flex flex-col justify-center gap-8'>
                <TextField
                    name='email'
                    value={userCredentials.email}
                    className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                    required
                    id="outlined-required"
                    type=""
                    placeholder='Enter Email'
                    label="Email"
                    onChange={(event) => onChangeHandler(event)}
                />  
                <TextField
                    name='password'
                    value={userCredentials.password}
                    className='border border-black focus:outline-pink-400 w-full focus:ring-black'
                    required
                    id="outlined-required"
                    type="password"
                    placeholder='Enter password'
                    label="Password"
                    onChange={(event) => onChangeHandler(event)}
                />  
                <button type='submit' className='bg-airbnb-primaryPink text-white font-semibold text-xl rounded-md px-4 py-2' onClick={(event) => handleSubmit(event)}>Login</button>
            </form>
        </div>
        }
        {
            authToken && 
            <div className='flex flex-col justify-center h-screen w-screen items-center'>
                <p className='text-2xl font-semibold'>User Already Logged In :)</p>
                <p className='text-xl font-semibold'>Return to <Link className='text-blue-500 underline' to={"/"} >Home</Link> to explore properties</p>
            </div>
        }
    </React.Fragment>
  )
}

export default LoginPageCompnent
