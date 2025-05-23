import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice ';
import customerReducer from "../redux/CustomerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer

    },
});
