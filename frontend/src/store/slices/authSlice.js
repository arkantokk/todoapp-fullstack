import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from '../../http/index';

const $axios = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $axios.get('/auth/refresh');

            localStorage.setItem('token', response.data.accessToken);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return rejectWithValue(error.response?.data?.message || 'Unauthorized');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await $axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async ({ email, password, username }, { rejectWithValue }) => {
        try {
            const response = await $axios.post('/auth/registration', { email, password, username });
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await $axios.post('/auth/logout');
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changepassword',
    async ({ currentPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await $axios.post('/auth/changepassword', { 
                currentPassword, 
                newPassword 
            });
            return response.data;
        } catch (error) {
            // Ми повертаємо ВЕСЬ об'єкт response.data, 
            // бо там лежить масив errors від валідатора
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

const getUserFromStorage = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        return null;
    }
}

const initialState = {
    user: getUserFromStorage(),
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: !!localStorage.getItem('token'),
    error: null,
    theme: localStorage.getItem('theme') || 'default'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.isAuth = true;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', accessToken);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setTheme: (state, action) => {
            const theme = action.payload;
            state.theme = theme;
            localStorage.setItem('theme', theme);
        }
    },

    extraReducers: (builder) => {
        builder
            // CHECK AUTH
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.user = null;
                state.token = null;
                state.error = action.payload;
            })

            // LOGIN
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })

            // REGISTRATION
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.error = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.error = action.payload;
            })

            // LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuth = false;
            })
            .addCase(logout.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.isAuth = false;
            })

            // CHANGE PASSORD
            // .addCase(changePassword.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(changePassword.fulfilled, (state, action) => {
            //     state.isLoading = false;
            // })
            // .addCase(changePassword.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.error = action.payload;
            // })
    }
});

export const { setCredentials, setLoading, setTheme } = authSlice.actions;

export default authSlice.reducer;