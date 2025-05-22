import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Kullanıcı bilgilerini doğrulamak için yeni bir thunk ekleyin


export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5020/api/Auth/login", userData);
        localStorage.setItem("token", response.data.token);
        return response.data;


    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5020/api/Auth/register", userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        localStorage.removeItem("token");
        return {};
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Kullanıcı verisini doğrulama thunk fonksiyonu
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token bulunamadı.");
        }
        const response = await axios.get("http://localhost:5020/api/Auth/user-data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});




const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null
    },
    reducers: {
        setUser: (state, action) => { state.user = action.payload; }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });


    }
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;