import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPropertyData = createAsyncThunk(
    "property/fetchPropertyData",
    () => {
        return axios.get("https://airbnb-be.vercel.app/api/v1/property/getAllProperties")
        .then((response) => {
            console.log(response)
            return response.data
        })
    }
)

export const searchProperty = createAsyncThunk(
    "property/searchProperty",
    ({city,adults,children,infants,pets}) => {
        return axios.get(`https://airbnb-be.vercel.app/api/v1/property/search?city=${city}&adults=${adults}&children=${children}&infants=${infants}&pets=${pets}`)
        .then((response) => {
            console.log(response)
            return response.data
        })
    }
)

export const fetchWishlist = createAsyncThunk(
    "property/fetchWishlist",
    (authToken) => {
        console.log("tokenfrom redux", authToken)
        return axios.post("https://airbnb-be.vercel.app/api/v1/property/getWishlistProperty", {}, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then((response) => {
            console.log("response.data from redux",response.data)
            return response.data
        })
    } 
)


const propertySlice = createSlice({
    name: "property",
    initialState:{
        loading: false,
        data: [],
        error:""
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPropertyData.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchPropertyData.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = ""
        })
        .addCase(fetchPropertyData.rejected, (state, action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })

        .addCase(searchProperty.pending, (state, action) => {
            state.loading = true
        })

        .addCase(searchProperty.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = ""
        })
        .addCase(searchProperty.rejected, (state,action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
        .addCase(fetchWishlist.pending, (state, action) => {
            state.loading = true
        })

        .addCase(fetchWishlist.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = ""
        })
        .addCase(fetchWishlist.rejected, (state,action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
})


export default propertySlice.reducer