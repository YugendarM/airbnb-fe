import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    (userCredentials) => {
        // console.log(userCredentials)
        return axios.post("http://localhost:3000/api/v1/user/login", userCredentials)
        .then((response) => {
            console.log(".then running")
            console.log("redux respose"+response)
            return response.data
        })
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        data: {},
        error: ""
    },
    reducers: {
        setUserData: (state, action) => {
            console.log("action.payload"+action.payload.userName)
            state.data = action.payload
        }
    }
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(loginUser.pending, (state, action) => {
    //         state.loading = true
    //     })
    //     .addCase(loginUser.fulfilled, (state,action) => {
    //         state.loading = false,
    //         console.log("dataaaa"+state.data)
    //         state.data = action.payload,
    //         state.error = ""
    //     })
    //     .addCase(loginUser.rejected, (state, action) => {
    //         state.loading= false
    //         state.data = []
    //         console.log("action.err"+action.error)
    //         state.error = action.error.message
    //     })
    // }
})

export const {setUserData} = userSlice.actions

export default userSlice.reducer