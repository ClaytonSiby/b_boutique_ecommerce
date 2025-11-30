import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants';
import type { Order, OrdersResponse, PaginationParams } from '../types';

export const ordersApi = {
    /**
     * Get all orders for current user
     */
    getOrders: async (params?: PaginationParams): Promise<OrdersResponse> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.size) queryParams.append('size', params.size.toString());

        return apiClient.get<OrdersResponse>(
            `${API_ENDPOINTS.ORDERS.LIST}?${queryParams.toString()}`
        );
    },

    /**
     * Get single order by ID
     */
    getOrder: async (id: string): Promise<Order> => {
        return apiClient.get<Order>(API_ENDPOINTS.ORDERS.DETAIL(id));
    },

    /**
     * Create new order from cart
     */
    createOrder: async (): Promise<Order> => {
        return apiClient.post<Order>(API_ENDPOINTS.ORDERS.CREATE);
    },
};
