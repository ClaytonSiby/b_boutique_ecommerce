import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL, STORAGE_KEYS } from '../constants';
import type { ApiError } from '../types';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor - add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - handle errors
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<ApiError>) => {
                if (error.response?.status === 401) {
                    // Clear auth data and redirect to login
                    this.clearAuth();
                    if (typeof window !== 'undefined') {
                        window.location.href = '/auth/login';
                    }
                }
                return Promise.reject(this.handleError(error));
            }
        );
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    private clearAuth() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    private handleError(error: AxiosError<ApiError>): ApiError {
        if (error.response) {
            return {
                detail: error.response.data.detail || 'An error occurred',
                status: error.response.status,
            };
        }
        if (error.request) {
            return {
                detail: 'No response from server',
                status: 0,
            };
        }
        return {
            detail: error.message || 'An unexpected error occurred',
        };
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.patch(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config);
        return response.data;
    }

    setToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        }
    }

    removeToken() {
        this.clearAuth();
    }
}

export const apiClient = new ApiClient();
