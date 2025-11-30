import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants';
import type { Cart, CartItem } from '../types';

export const cartApi = {
    /**
     * Get current cart
     */
    getCart: async (): Promise<Cart> => {
        return apiClient.get<Cart>(API_ENDPOINTS.CART.GET);
    },

    /**
     * Add item to cart
     */
    addToCart: async (productId: string, quantity: number): Promise<Cart> => {
        return apiClient.post<Cart>(API_ENDPOINTS.CART.ADD, {
            product_id: productId,
            quantity,
        });
    },

    /**
     * Update cart item quantity
     */
    updateCartItem: async (itemId: string, quantity: number): Promise<Cart> => {
        return apiClient.patch<Cart>(API_ENDPOINTS.CART.UPDATE(itemId), {
            quantity,
        });
    },

    /**
     * Remove item from cart
     */
    removeFromCart: async (itemId: string): Promise<Cart> => {
        return apiClient.delete<Cart>(API_ENDPOINTS.CART.REMOVE(itemId));
    },

    /**
     * Clear cart
     */
    clearCart: async (): Promise<void> => {
        return apiClient.delete<void>(API_ENDPOINTS.CART.CLEAR);
    },
};
