// redux/CustomerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5043/api/Customer';

// Müşterileri listele
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (filters = {}) => {
    // filters: { name, region, fromDate, toDate }
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.region) params.append('region', filters.region);
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
});

// Müşteri ekle
export const addCustomer = createAsyncThunk('customers/addCustomer', async (customerData) => {
    const response = await axios.post(API_URL, customerData);
    return response.data;
});

// Müşteri güncelle
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, customerData }) => {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data;
});

// Müşteri sil
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        loading: false,
        error: null,
    },
    reducers: {
        // İstersen local state işlemleri burada
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
            })
            // updateCustomer
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            // deleteCustomer
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(c => c.id !== action.payload);
            });
    },
});

export default customerSlice.reducer;
