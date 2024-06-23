import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";
import userReducer from "./user/userSlice"

const store = configureStore(
    {
        reducer: {
            property: propertyReducer,
            user: userReducer
        }
    }
)

export default store