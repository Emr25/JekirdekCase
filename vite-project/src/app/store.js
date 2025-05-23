import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice ';
import customersReducer from '../features/customers/customersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customersReducer,
    },
});
