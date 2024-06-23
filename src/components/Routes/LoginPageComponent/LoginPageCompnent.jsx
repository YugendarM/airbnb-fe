import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/user/userSlice';

const LoginPageCompnent = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })

    // const dispatch = useDispatch()
    // const userData = useSelector((state => state.user))

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
                alert("User logged in successfully")
                window.location.href = "/"
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
    <div>
        <h1>User Login</h1>
        <form>
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
            <button type='submit' className='' onClick={(event) => handleSubmit(event)}>Login</button>
        </form>
        <div>
            {/* {
                userData.loading && <p>Loading</p>
            }
            {
                !userData.loading && userData.data.token && <p>Login successfull</p>
            }
            {
                !userData.loading && !userData.data.token && userData.error && <p>Error logging in</p>
            } */}
        </div>
    </div>
  )
}

export default LoginPageCompnent
