'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faHeart,
  faStar,
  faStarHalfAlt,
  faMinus,
  faPlus,
  faCheck,
  faTruck,
  faShield,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { getImageUrl } from '@/lib/utils/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  sale_price: string | null;
  images: string[];
  category_id: string;
  is_active: boolean;
  stock_quantity?: number;
  created_at: string;
  updated_at: string;
}


export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { isAuthenticated, token } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`);

      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError('Failed to load product');
      console.error('Error fetching product:', err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const checkFavoriteStatus = useCallback(async () => {
    if (!token || !product) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/favorites/check/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.is_favorited);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  }, [token, product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (product && isAuthenticated) {
      checkFavoriteStatus();
    }
  }, [product, isAuthenticated, checkFavoriteStatus]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    if (!product) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart';
      alert(message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    if (!product || !token) return;

    setIsTogglingFavorite(true);
    try {
      if (isFavorited) {
        const response = await fetch(
          `${API_BASE_URL}/favorites/${product.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsFavorited(false);
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id }),
        });

        if (response.ok) {
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `R ${numPrice.toFixed(2)}`;
  };

  const calculateDiscount = () => {
    if (!product?.sale_price) return 0;
    const original = parseFloat(product.price);
    const sale = parseFloat(product.sale_price);
    return Math.round(((original - sale) / original) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Product Not Found</h2>
          <p className="text-[#8b6d5a] mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#8b6d5a] hover:text-[#b88e72] transition-colors mb-8 font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Products</span>
        </Link>

        {showSuccessMessage && (
          <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} />
            <span>Added to cart successfully!</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={getImageUrl(product.images[selectedImage])}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}

                {product.sale_price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {calculateDiscount()}% OFF
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[#b88e72]'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image src={getImageUrl(image)} alt={`${product.name} ${index + 1}`} fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#3d2c29] mb-2">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={i < 4 ? faStar : faStarHalfAlt} />
                    ))}
                  </div>
                  <span className="text-sm text-[#8b6d5a]">(4.5 / 128 reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  {product.sale_price ? (
                    <>
                      <span className="text-3xl font-bold text-[#b88e72]">
                        {formatPrice(product.sale_price)}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-[#b88e72]">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-6">
                <h2 className="font-semibold text-[#3d2c29] mb-2">Description</h2>
                <p className="text-[#8b6d5a] leading-relaxed">{product.description}</p>
              </div>

              <div>
                <label className="block font-semibold text-[#3d2c29] mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="w-16 text-center text-lg font-medium text-[#3d2c29]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !product.is_active}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleToggleFavorite}
                  disabled={isTogglingFavorite}
                  className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all shadow-md hover:shadow-lg ${
                    isFavorited
                      ? 'bg-red-50 text-red-500 hover:bg-red-100'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <FontAwesomeIcon
                    icon={isFavorited ? faHeart : faHeartOutline}
                    className="text-xl"
                  />
                </button>
              </div>

              <div className="space-y-3 pt-6">
                <div className="flex items-center gap-3 text-[#8b6d5a]">
                  <FontAwesomeIcon icon={faTruck} className="text-[#b88e72]" />
                  <span>Free shipping on orders over R500</span>
                </div>
                <div className="flex items-center gap-3 text-[#8b6d5a]">
                  <FontAwesomeIcon icon={faShield} className="text-[#b88e72]" />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center gap-3 text-[#8b6d5a]">
                  <FontAwesomeIcon icon={faCheck} className="text-[#b88e72]" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
