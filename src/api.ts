
import axios from 'axios';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string)?.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '') || 'https://api.edirnego.com';
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

// Yerel geliştirmede prod resimlerini görmek isterseniz true yapabilirsiniz
const USE_PROD_IMAGES_LOCALLY = true;

export const getImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  
  // Yerelde çalışırken yerel backend'deki resimleri görmek istiyoruz
  if (window.location.hostname === 'localhost' && cleanUrl.startsWith('/uploads')) {
    // Profil resimleri yerelde olabilir, onları yerel backendden çekmeyi dene
    if (cleanUrl.includes('/profiles/')) {
      return `${API_BASE_URL}${cleanUrl}`;
    }
    // Diğerleri (mekanlar vb) için prod'dan çekmek daha güvenli (yerelde eksik olabilir)
    // Eğer bunları da yerelden çekmek isterseniz üstteki profiller gibi yapabilirsiniz
    return `https://api.edirnego.com${cleanUrl}`;
  }
  
  // Backend statik dosyaları artık /uploads üzerinden sunuyor (api/v1 prefixi olmadan)
  return `${API_BASE_URL}${cleanUrl}`;
};
