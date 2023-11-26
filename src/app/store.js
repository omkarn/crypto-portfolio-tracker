import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from '../features/userSlice'
import cryptoReducer from '../features/cryptoSlice'


export default configureStore({
    reducer : {
        user : userReducer,
        crypto : cryptoReducer,
    },
});