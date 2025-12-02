'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faPlus, faMinus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useCart } from '@/hooks/useCart';

function CartContent() {
  const { cart, cartItemsCount, isLoading, updateCartItem, removeFromCart, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `R ${numPrice.toFixed(2)}`;
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!confirm('Remove this item from your cart?')) return;

    setRemovingItems((prev) => new Set(prev).add(itemId));
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setRemovingItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;

    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const calculateSubtotal = () => {
    if (!cart?.cart_items) return 0;
    return cart.cart_items.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0; // R10 flat shipping
  const total = subtotal + tax + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <FontAwesomeIcon icon={faShoppingCart} className="text-4xl text-[#b88e72]" />
          </div>
          <h1 className="text-4xl font-bold text-[#3d2c29] mb-2">Shopping Cart</h1>
          <p className="text-[#8b6d5a]">
            {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Empty Cart State */}
        {!cart?.cart_items || cart.cart_items.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-6xl text-gray-300 mb-6"
              />
              <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Your Cart is Empty</h2>
              <p className="text-[#8b6d5a] mb-6">
                Add some products to your cart to see them here!
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#3d2c29]">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {cart.cart_items.map((item) => {
                const isUpdating = updatingItems.has(item.id);
                const isRemoving = removingItems.has(item.id);
                const product = item.product;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all ${
                      isRemoving ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        href={`/products/${product?.slug || item.product_id}`}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                          {product?.images && product.images.length > 0 ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name || 'Product'}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product?.slug || item.product_id}`}
                          className="block"
                        >
                          <h3 className="font-semibold text-[#3d2c29] mb-1 hover:text-[#b88e72] transition-colors">
                            {product?.name || 'Product'}
                          </h3>
                        </Link>
                        {product?.description && (
                          <p className="text-sm text-[#8b6d5a] mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          {product?.sale_price ? (
                            <>
                              <span className="text-lg font-bold text-[#b88e72]">
                                {formatPrice(product.sale_price)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-[#b88e72]">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating || item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <FontAwesomeIcon icon={faMinus} className="text-sm" />
                            </button>
                            <span className="w-12 text-center font-medium text-[#3d2c29]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <FontAwesomeIcon icon={faPlus} className="text-sm" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isRemoving}
                            className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                            aria-label="Remove item"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      <div className="hidden sm:block text-right">
                        <p className="text-lg font-bold text-[#b88e72]">
                          {formatPrice(parseFloat(item.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#3d2c29] mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#8b6d5a]">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#8b6d5a]">
                    <span>Tax (10%):</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-[#8b6d5a]">
                    <span>Shipping:</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-[#3d2c29]">Total:</span>
                      <span className="text-[#b88e72]">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium mb-3"
                >
                  <span>Proceed to Checkout</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>

                <Link
                  href="/products"
                  className="block text-center text-[#8b6d5a] hover:text-[#b88e72] transition-colors text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#3d2c29] text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <ProtectedRoute>
        <CartContent />
      </ProtectedRoute>
    </Suspense>
  );
}
