import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./property/propertySlice";

const store = configureStore(
    {
        reducer: {
            property: propertyReducer
        }
    }
)

export default store