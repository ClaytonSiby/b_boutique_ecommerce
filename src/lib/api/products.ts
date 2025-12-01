import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants';
import type { Product, ProductsResponse, ProductFilters } from '../types';

export const productsApi = {
    /**
     * Get all products with filters
     */
    getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.size) params.append('size', filters.size.toString());
        if (filters?.category_id) params.append('category_id', filters.category_id);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.min_price) params.append('min_price', filters.min_price.toString());
        if (filters?.max_price) params.append('max_price', filters.max_price.toString());

        const products_response = await apiClient.get<ProductsResponse>(
            `${API_ENDPOINTS.PRODUCTS.LIST}`
        );
        return products_response;
    },

    /**
     * Get single product by ID
     */
    getProduct: async (id: string): Promise<Product> => {
        return apiClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    },

    /**
     * Create new product (admin only)
     */
    createProduct: async (data: Partial<Product>): Promise<Product> => {
        return apiClient.post<Product>(API_ENDPOINTS.PRODUCTS.CREATE, data);
    },

    /**
     * Update product (admin only)
     */
    updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
        return apiClient.patch<Product>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
    },

    /**
     * Delete product (admin only)
     */
    deleteProduct: async (id: string): Promise<void> => {
        return apiClient.delete<void>(API_ENDPOINTS.PRODUCTS.DELETE(id));
    },
};
