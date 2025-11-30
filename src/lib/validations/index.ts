import * as z from 'zod';

// Auth validations
export const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

// Product validations
export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be positive'),
    sale_price: z.number().positive().optional(),
    sku: z.string().min(1, 'SKU is required'),
    category_id: z.string().optional(),
    is_active: z.boolean().default(true),
});

// Cart validations
export const addToCartSchema = z.object({
    product_id: z.string().uuid('Invalid product ID'),
    quantity: z.number().int().positive('Quantity must be positive'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
