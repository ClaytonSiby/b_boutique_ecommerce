// User types
export interface User {
    id: string;
    username: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

// Product types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    sale_price?: number;
    sku: string;
    category_id?: string;
    images?: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
    category?: Category;
}

export interface ProductsResponse {
    items: Product[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

// Category types
export interface Category {
    id: string;
    name: string;
    description?: string;
    slug: string;
    parent_id?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Cart types
export interface CartItem {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    product?: Product;
}

export interface Cart {
    id: string;
    user_id: string;
    items: CartItem[];
    total: number;
    created_at: string;
    updated_at: string;
}

// Order types
export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    product?: Product;
}

export interface Order {
    id: string;
    user_id: string;
    status: OrderStatus;
    total_amount: number;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrdersResponse {
    items: Order[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

// Auth types
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

// API Response types
export interface ApiError {
    detail: string;
    status?: number;
}

export interface PaginationParams {
    page?: number;
    size?: number;
}

export interface ProductFilters extends PaginationParams {
    category_id?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    is_active?: boolean;
}
