"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Helper to convert image URLs to absolute URLs
const getImageUrl = (url: string | null): string => {
  if (!url) return '/assets/images/placeholder.svg';
  if (url.startsWith('http')) return url;
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  return `${API_URL}${url}`;
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category_id: string;
  brand?: string;
  stock_quantity: number;
  slug: string;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/categories/');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = 'http://localhost:8000/api/v1/products/?limit=6&is_active=true';
        if (selectedCategory) {
          url += `&category_id=${selectedCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return getImageUrl(product.images[0]);
    }
    return '/assets/images/placeholder.svg';
  };

  if (error && products.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#b88e72] text-white rounded-full hover:bg-[#a67c52]"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-br from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-4">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
            Discover our latest collection featuring the newest trends in fashion. Carefully curated pieces that blend style with comfort.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 flex-wrap px-2">
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
              selectedCategory === null
                ? 'bg-linear-to-r from-[#3d2c29] to-[#2d1f1c] text-white hover:shadow-xl hover:shadow-[#3d2c29]/30'
                : 'bg-white text-[#3d2c29] hover:bg-gray-50 border border-gray-200 hover:border-[#b88e72] hover:shadow-lg'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-linear-to-r from-[#3d2c29] to-[#2d1f1c] text-white hover:shadow-xl hover:shadow-[#3d2c29]/30'
                  : 'bg-white text-[#3d2c29] hover:bg-gray-50 border border-gray-200 hover:border-[#b88e72] hover:shadow-lg'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b88e72]"></div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="bg-linear-to-br from-[#e7d6c6] to-[#d4c5b6] h-64 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      width={240}
                      height={240}
                      className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        Low Stock
                      </div>
                    )}
                    {product.stock_quantity === 0 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-full">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#3d2c29] text-lg mb-1 truncate">{product.name}</h3>
                    {product.brand && (
                      <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                    )}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#3d2c29]">
                        R{Number(product.price).toFixed(2)}
                      </span>
                      {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                        <span className="text-red-500 text-sm">Almost Sold Out</span>
                      )}
                      {product.stock_quantity === 0 && (
                        <span className="text-gray-500 text-sm">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Products Message */}
            {products.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
                <button
                  onClick={() => handleCategoryFilter(null)}
                  className="px-6 py-2 bg-[#b88e72] text-white rounded-full hover:bg-[#a67c52]"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* View More Button */}
            {products.length > 0 && (
              <div className="flex justify-center">
                <Link
                  href="/products"
                  className="group px-10 py-3 bg-linear-to-r from-[#3d2c29] to-[#2d1f1c] text-white rounded-full font-medium hover:from-[#2d1f1c] hover:to-[#3d2c29] transition-all duration-300 shadow-2xl hover:shadow-[#3d2c29]/50 hover:scale-105"
                >
                  View More
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
