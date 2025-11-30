'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, type UserResponse } from '@/lib/api';

interface AuthState {
    user: UserResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (username: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authApi.login({ username, password });
                    localStorage.setItem('access_token', response.access_token);
                    set({ token: response.access_token });

                    // Fetch user data after login
                    await get().fetchUser();
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error && 'response' in error
                        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Login failed'
                        : 'Login failed';
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },

            register: async (username: string, email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    await authApi.register({ username, email, password });

                    // Auto-login after registration
                    await get().login(username, password);
                } catch (error: unknown) {
                    const errorMessage = error instanceof Error && 'response' in error
                        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Registration failed'
                        : 'Registration failed';
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem('access_token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            fetchUser: async () => {
                set({ isLoading: true, error: null });
                try {
                    const user = await authApi.getCurrentUser();
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: unknown) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: 'Failed to fetch user',
                    });
                    throw error;
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token }),
        }
    )
);
