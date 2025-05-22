import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.jsx';
import customersReducer from '../features/customers/customersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customersReducer,
    },
});
