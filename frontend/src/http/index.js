import axios from 'axios';

export const API_URL = 'http://localhost:5500/api';

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

    // Перевіряємо статус 401 і чи це не повторний запит
    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {

        if (isRefreshing) {
            // Якщо оновлення вже йде, створюємо проміс і додаємо його в чергу
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
            // Використовуємо чистий axios для рефрешу
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            const newToken = response.data.accessToken;

            localStorage.setItem('token', newToken);

            // Виконуємо всі запити з черги
            onRefreshed(newToken);
            isRefreshing = false;

            // Виконуємо поточний запит
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return $api(originalRequest);
        } catch (e) {
            isRefreshing = false;
            refreshSubscribers = [];

            // ДОДАЙ ЦЕ: Якщо запит просто скасовано (наприклад, F5), не кидай помилку як 401
            if (axios.isCancel(e)) {
                return new Promise(() => { }); // "Заморожуємо" проміс, щоб не було rejected
            }

            console.log('АВТОРИЗАЦІЯ ВТРАЧЕНА');
            return Promise.reject(e);
        }
    }
    return Promise.reject(error);
});

export default $api;