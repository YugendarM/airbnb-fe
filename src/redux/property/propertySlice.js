import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPropertyData = createAsyncThunk(
    "property/fetchPropertyData",
    () => {
        return axios.get("http://localhost:3000/api/v1/property/getAllProperties")
        .then((response) => {
            console.log(response)
            return response.data
        })
    }
)

export const searchProperty = createAsyncThunk(
    "property/searchProperty",
    ({city,adults,children,infants,pets}) => {
        return axios.get(`http://localhost:3000/api/v1/property/search?city=${city}&adults=${adults}&children=${children}&infants=${infants}&pets=${pets}`)
        .then((response) => {
            console.log(response)
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
    }
})


export default propertySlice.reducer