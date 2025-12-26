import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';
import $api, { API_URL } from '../../http/index';

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue, signal }) => {
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                withCredentials: true,
                signal: signal
            });

            localStorage.setItem('token', response.data.accessToken);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            if (axios.isCancel(error) || error.code === 'ERR_NETWORK') {
                throw error;
            }

            if (error.response) {
                return rejectWithValue(error.response?.data?.message || 'Помилка авторизації');
            }
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await $api.post('/auth/logout', {});
        } catch (error) {
            console.warn("Logout error on server", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
)

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
    isAuth: !!localStorage.getItem('token'),
    isLoading: false,
    error: null
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
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                if (action.payload.user) {
                    state.user = action.payload.user;
                }
                state.token = action.payload.accessToken;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;

                if (action.payload) {
                    // Ми не видаляємо все відразу. 
                    // Якщо це була помилка 401 на старті (рефреш), 
                    // можливо це просто "глюк" подвійного оновлення.

                    // Перевіряємо, чи є взагалі токен. 
                    // Якщо він є, ми даємо системі шанс НЕ вилогінювати користувача миттєво.
                    const currentToken = localStorage.getItem('token');

                    if (currentToken) {
                        console.warn("CheckAuth rejected, but token exists. Ignoring to prevent session kill on rapid refresh.");
                        // Ми НЕ скидаємо isAuth в false тут миттєво, 
                        // щоб RequireAuth не спрацював раніше часу.
                        return;
                    }

                    state.isAuth = false;
                    state.user = null;
                    state.token = null;
                    state.error = action.payload;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            })
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

    }
});


export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;