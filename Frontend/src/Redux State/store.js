import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice/authSlice.js'

export const store = configureStore({
    reducer : {
        auth : authReducer
    }
})