import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
}

const onRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token));
    refreshSubscribers = [];
}

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.config.url.includes('/auth/refresh')) {
        return Promise.reject(error);
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
        if (isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest._isRetry = true;
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve($api(originalRequest));
                });
            });
        }

        originalRequest._isRetry = true;
        isRefreshing = true;

        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            const newToken = response.data.accessToken;

            localStorage.setItem('token', newToken);
            onRefreshed(newToken);
            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return $api(originalRequest);
        } catch (e) {
            isRefreshing = false;
            refreshSubscribers = [];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject(e);
        }
    }
    return Promise.reject(error);
});

export default $api;