import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem, Product } from '../types';
import { STORAGE_KEYS } from '../constants';

interface CartState {
    cart: Cart | null;
    itemCount: number;
    total: number;

    // Actions
    setCart: (cart: Cart | null) => void;
    addItem: (product: Product, quantity: number) => void;
    updateItemQuantity: (itemId: string, quantity: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: null,
            itemCount: 0,
            total: 0,

            setCart: (cart) => {
                set({ cart });
                get().calculateTotals();
            },

            addItem: (product, quantity) => {
                const { cart } = get();
                if (!cart) return;

                const existingItem = cart.items.find((item) => item.product_id === product.id);

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    const newItem: CartItem = {
                        id: `temp-${Date.now()}`,
                        product_id: product.id,
                        quantity,
                        price: product.sale_price || product.price,
                        product,
                    };
                    cart.items.push(newItem);
                }

                set({ cart: { ...cart } });
                get().calculateTotals();
            },

            updateItemQuantity: (itemId, quantity) => {
                const { cart } = get();
                if (!cart) return;

                const item = cart.items.find((item) => item.id === itemId);
                if (item) {
                    item.quantity = quantity;
                    set({ cart: { ...cart } });
                    get().calculateTotals();
                }
            },

            removeItem: (itemId) => {
                const { cart } = get();
                if (!cart) return;

                cart.items = cart.items.filter((item) => item.id !== itemId);
                set({ cart: { ...cart } });
                get().calculateTotals();
            },

            clearCart: () => {
                set({ cart: null, itemCount: 0, total: 0 });
            },

            calculateTotals: () => {
                const { cart } = get();
                if (!cart) {
                    set({ itemCount: 0, total: 0 });
                    return;
                }

                const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

                set({ itemCount, total });
            },
        }),
        {
            name: STORAGE_KEYS.CART,
        }
    )
);
