
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const API_URL = `${API_BASE_URL}/api/v1`;

export const api = axios.create({
    baseURL: API_URL,
});

export const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
};
