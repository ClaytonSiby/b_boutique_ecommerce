import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { STORAGE_KEYS } from '../constants';
import { authApi } from '../api';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (token: string, user: User) => void;
    logout: () => void;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,

            setUser: (user) => set({ user, isAuthenticated: !!user }),

            setToken: (token) => set({ token }),

            login: (token, user) => {
                set({ token, user, isAuthenticated: true });
                if (typeof window !== 'undefined') {
                    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
                }
            },

            logout: () => {
                set({ token: null, user: null, isAuthenticated: false });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                }
            },

            initialize: async () => {
                try {
                    const token = typeof window !== 'undefined'
                        ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
                        : null;

                    if (token) {
                        const user = await authApi.getCurrentUser();
                        set({ token, user, isAuthenticated: true, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch {
                    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                    }
                }
            },
        }),
        {
            name: STORAGE_KEYS.USER,
            partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);
