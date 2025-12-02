'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCheck, faTruck, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/constants';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: string;
  subtotal: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: string;
  tax: string;
  shipping_cost: string;
  total: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  // Removed unused selectedOrder state

  useEffect(() => {
    if (searchParams?.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `R ${numPrice.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to cancel order');
      }

      // Refresh orders list
      await fetchOrders();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel order';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const canCancelOrder = (status: string) => {
    const lowerStatus = status.toLowerCase();
    return !['shipped', 'delivered', 'cancelled', 'refunded'].includes(lowerStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return faCheck;
      case 'shipped':
        return faTruck;
      default:
        return faBox;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
            <div>
              <h3 className="font-bold text-green-800">Order Placed Successfully!</h3>
              <p className="text-sm text-green-700">
                Your order has been confirmed. We&apos;ll send you updates via email.
              </p>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <FontAwesomeIcon icon={faBox} className="text-4xl text-[#b88e72]" />
          </div>
          <h1 className="text-4xl font-bold text-[#3d2c29] mb-2">My Orders</h1>
          <p className="text-[#8b6d5a]">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <FontAwesomeIcon
                icon={faBox}
                className="text-6xl text-gray-300 mb-6"
              />
              <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">
                No Orders Yet
              </h2>
              <p className="text-[#8b6d5a] mb-6">
                You haven&apos;t placed any orders yet. Start shopping to see your orders here!
              </p>
              <a
                href="/products"
                className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
              >
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-linear-to-r from-[#f7e6e1] to-white p-6 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#3d2c29] mb-1">
                        Order #{order.order_number}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#8b6d5a]">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{formatDate(order.created_at)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <FontAwesomeIcon icon={getStatusIcon(order.status)} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Order Items Summary */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#3d2c29] mb-3">
                      Order Items ({order.order_items.length})
                    </h4>
                    <div className="space-y-2">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex-1">
                            <p className="text-sm text-[#3d2c29]">
                              Product ID: {item.product_id.substring(0, 8)}...
                            </p>
                            <p className="text-xs text-[#8b6d5a]">
                              Quantity: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#b88e72]">
                              {formatPrice(item.subtotal)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b6d5a]">Subtotal:</span>
                      <span className="text-[#3d2c29]">{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b6d5a]">Tax:</span>
                      <span className="text-[#3d2c29]">{formatPrice(order.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b6d5a]">Shipping:</span>
                      <span className="text-[#3d2c29]">
                        {formatPrice(order.shipping_cost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-[#3d2c29]">Total:</span>
                      <span className="text-[#b88e72]">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/orders/${order.id}#tracking`}
                      className="px-4 py-2 text-sm font-medium text-[#3d2c29] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Track Order
                    </Link>
                    {canCancelOrder(order.status) && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
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
        <OrdersContent />
      </ProtectedRoute>
    </Suspense>
  );
}
