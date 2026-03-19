import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login with return URL
            localStorage.removeItem('auth_token');
            const returnUrl = encodeURIComponent(window.location.pathname);
            window.location.href = `/login?returnUrl=${returnUrl}`;
        }
        return Promise.reject(error);
    }
);

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

// Auth endpoints
export const authApi = {
    register: async (data: RegisterData): Promise<UserResponse> => {
        const response = await api.post('/api/v1/auth/register', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<TokenResponse> => {
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);

        const response = await api.post('/api/v1/auth/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        const response = await api.get('/api/v1/users/me');
        return response.data;
    },
};
