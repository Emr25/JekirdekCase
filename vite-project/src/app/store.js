import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice ';


export const store = configureStore({
    reducer: {
        auth: authReducer,

    },
});
