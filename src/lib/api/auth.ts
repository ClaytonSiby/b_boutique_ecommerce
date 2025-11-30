import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants';
import type {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
} from '../types';

export const authApi = {
    /**
     * Login user
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },

    /**
     * Register new user
     */
    register: async (data: RegisterData): Promise<User> => {
        return apiClient.post<User>(API_ENDPOINTS.AUTH.REGISTER, data);
    },

    /**
     * Get current user
     */
    getCurrentUser: async (): Promise<User> => {
        return apiClient.get<User>(API_ENDPOINTS.USERS.ME);
    },

    /**
     * Logout user
     */
    logout: () => {
        apiClient.removeToken();
    },
};
