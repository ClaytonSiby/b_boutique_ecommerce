export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_BASE_URL = `${API_URL}/api/v1`;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'B Boutique';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/v1/auth/token',
        REGISTER: '/api/v1/auth/register',
        LOGOUT: '/api/v1/auth/logout',
        REFRESH: '/api/v1/auth/refresh',
    },
    USERS: {
        ME: '/api/v1/users/me',
        UPDATE: '/api/v1/users/me',
    },
    PRODUCTS: {
        LIST: '/api/v1/products',
        DETAIL: (id: string) => `/api/v1/products/${id}`,
        BY_SLUG: (slug: string) => `/api/v1/products/slug/${slug}`,
        CREATE: '/api/v1/products',
        UPDATE: (id: string) => `/api/v1/products/${id}`,
        DELETE: (id: string) => `/api/v1/products/${id}`,
    },
    CART: {
        GET: '/api/v1/cart',
        ADD: '/api/v1/cart/items',
        UPDATE: (id: string) => `/api/v1/cart/items/${id}`,
        REMOVE: (id: string) => `/api/v1/cart/items/${id}`,
        CLEAR: '/api/v1/cart/clear',
    },
    ORDERS: {
        LIST: '/api/v1/orders',
        DETAIL: (id: string) => `/api/v1/orders/${id}`,
        CREATE: '/api/v1/orders',
    },
    CATEGORIES: {
        LIST: '/api/v1/categories',
        DETAIL: (id: string) => `/api/v1/categories/${id}`,
    },
    FAVORITES: {
        LIST: '/api/v1/favorites',
        ADD: '/api/v1/favorites',
        REMOVE: (id: string) => `/api/v1/favorites/${id}`,
        CHECK: (id: string) => `/api/v1/favorites/check/${id}`,
    },
    BLOG: {
        LIST: '/api/v1/blog',
        DETAIL: (slug: string) => `/api/v1/blog/${slug}`,
        CATEGORIES: '/api/v1/blog/categories',
    },
} as const;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PRODUCTS: '/shop/products',
    PRODUCT_DETAIL: (id: string) => `/shop/products/${id}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
    ORDER_DETAIL: (id: string) => `/shop/orders/${id}`,
    ADMIN: '/admin',
    PROFILE: '/profile',
} as const;

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user',
    CART: 'cart',
} as const;

export const QUERY_KEYS = {
    PRODUCTS: 'products',
    PRODUCT: 'product',
    CART: 'cart',
    ORDERS: 'orders',
    ORDER: 'order',
    USER: 'user',
    CATEGORIES: 'categories',
} as const;
