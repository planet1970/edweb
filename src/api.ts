
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const API_URL = `${API_BASE_URL}/api/v1`;

export const api = axios.create({
    baseURL: API_URL,
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check for connection errors
        const isNetworkError = !error.response;

        // If it's a network error or a service unavailable error, redirect to maintenance
        if (isNetworkError || error.response?.status === 503) {
            console.error("MAINTENANCE REDIRECT REASON:", {
                isNetworkError,
                status: error.response?.status,
                url: error.config?.url,
                message: error.message
            });
            // Avoid infinite redirect if we're already on maintenance page (though the interceptor won't run if no request is made)
            if (!window.location.pathname.includes('/maintenance')) {
                window.location.href = '/maintenance';
            }
        }

        return Promise.reject(error);
    }
);

export const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
};
