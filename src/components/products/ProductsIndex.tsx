"use client";

import React, { useEffect, useState } from 'react';
import { productsApi } from '@/lib/api/products';
import type { Product, ProductsResponse } from '@/lib/types';
import styles from './ProductsIndex.module.css';

export default function ProductsIndex() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductsResponse = await productsApi.getProducts();
        console.log('Products data received:', data);
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <div className={styles.productsGrid}>
        {Array.isArray(products) && products.length > 0 ? products.map((product: Product) => {
            console.log(`Product: ${JSON.stringify(product)}`);
            return (
              <div key={product.id} className={styles.productCard}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Price:</strong> R{product.price}</p>
              </div>
            );
        }) : <p>No products available.</p>}
      </div>
    </div>
  );
}
