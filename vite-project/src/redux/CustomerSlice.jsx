import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5043/api/Customer';

// Async thunklar

export const fetchCustomers = createAsyncThunk(
    'customer/fetchCustomers',
    async (filters = {}) => {
        const { fullName, region } = filters;

        const params = new URLSearchParams();
        if (fullName) params.append('name', fullName);
        if (region) params.append('region', region);

        let url = API_URL;

        if (params.toString()) {
            if (fullName && !region) {
                url = `${API_URL}/by-name?${params.toString()}`;
            } else if (region && !fullName) {
                url = `${API_URL}/by-region?${params.toString()}`;
            } else {
                url = `${API_URL}?${params.toString()}`; // Hem name hem region varsa
            }
        }

        const response = await axios.get(url);
        return response.data;
    }
);

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (customerData) => {
        const response = await axios.post(API_URL, customerData);
        return response.data;
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async ({ id, customerData }) => {
        await axios.put(`${API_URL}/${id}`, customerData);
        return { id, ...customerData };
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);



// Slice oluşturma

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchCustomers
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // addCustomer
            .addCase(addCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers.push(action.payload);
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // updateCustomer
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // deleteCustomer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = state.customers.filter(c => c.id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });



    }
});

export default customerSlice.reducer;
