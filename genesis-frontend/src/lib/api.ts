import axios from 'axios';

// The base instance for client-side components
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://api.johnjaylawal.local:8000/api',
  withCredentials: true, // MANDATORY: Cross-domain cookie handshake
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT from Cookie
apiClient.interceptors.request.use((config) => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    if (match) {
      config.headers.Authorization = `Bearer ${match[2]}`;
    }
  }
  return config;
});

// Response Interceptor: Unpack the EseriaJSONRenderer
apiClient.interceptors.response.use(
  (response) => {
    // Strip the { success, message, data, errors } envelope if present
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Trigger silent token refresh logic here in the future
      console.error("Sovereignty Breach: Unauthorized access.");
    }
    return Promise.reject(error.response?.data?.errors || error.message);
  }
);

