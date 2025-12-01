'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCheck, faTruck, faCalendar, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

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
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/orders', {
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
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-[#3d2c29] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      Track Order
                    </button>
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
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
