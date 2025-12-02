'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faTruck,
  faCalendar,
  faMapMarkerAlt,
  faCreditCard,
  faArrowLeft,
  faCircle,
  faCheckCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/constants';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  images: string[];
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: string;
  subtotal: string;
  product?: Product;
}

interface Payment {
  id: string;
  payment_method: string;
  amount: string;
  currency: string;
  status: string;
  transaction_id?: string;
  created_at: string;
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
  payment?: Payment;
  shipping_address_id?: string;
  billing_address_id?: string;
}

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

function OrderDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchAddress = async (addressId: string, type: 'shipping' | 'billing' | 'both') => {
    try {
      const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const address = await response.json();
        if (type === 'shipping' || type === 'both') {
          setShippingAddress(address);
        }
        // Billing address is not used, so do not set it
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const fetchOrderDetails = async () => {
    if (!token || !orderId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data = await response.json();
      setOrder(data);

      // Fetch addresses
      if (data.shipping_address_id) {
        fetchAddress(data.shipping_address_id, 'shipping');
      }
      if (data.billing_address_id && data.billing_address_id !== data.shipping_address_id) {
        // Billing address is not used in UI, so skip fetching it
      }
    } catch (error) {
      setError('Failed to load order details');
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    setIsCancelling(true);
    try {
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

      // Refresh order details
      await fetchOrderDetails();
      alert('Order cancelled successfully');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel order';
      alert(errorMessage);
    } finally {
      setIsCancelling(false);
    }
  };

  const canCancelOrder = (status: string) => {
    const lowerStatus = status.toLowerCase();
    return !['shipped', 'delivered', 'cancelled', 'refunded'].includes(lowerStatus);
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

  const formatPrice = (price: string | number) => {
    const value = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(value)) return price;
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: faCircle },
      { key: 'processing', label: 'Processing', icon: faBox },
      { key: 'shipped', label: 'Shipped', icon: faTruck },
      { key: 'delivered', label: 'Delivered', icon: faHome },
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order?.status.toLowerCase() || '');

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Order Not Found</h2>
          <p className="text-[#8b6d5a] mb-6">{error || 'The order you are looking for does not exist.'}</p>
          <Link
            href="/orders"
            className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-[#8b6d5a] hover:text-[#b88e72] transition-colors mb-6 font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Orders</span>
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#3d2c29] mb-2">
                Order #{order.order_number}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#8b6d5a]">
                <FontAwesomeIcon icon={faCalendar} />
                <span>{formatDate(order.created_at)}</span>
              </div>
            </div>
            <span
              className={`px-6 py-3 rounded-full text-sm font-bold border-2 ${getStatusColor(order.status)}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          {/* Order Tracking */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#3d2c29] mb-6">Order Tracking</h3>
            <div className="relative">
              <div
                className={`absolute progressBar`}
                data-progress-width={
                  (statusSteps.filter((s) => s.completed).length - 1) * (100 / (statusSteps.length - 1))
                }
              ></div>
              <div className="relative flex justify-between">
                {statusSteps.map((step) => (
                  <div key={step.key} className="flex flex-col items-center stepContainer">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.completed
                          ? 'bg-[#b88e72] border-[#b88e72] text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      } ${step.active ? 'ring-4 ring-[#f7e6e1]' : ''}`}
                    >
                      <FontAwesomeIcon icon={step.completed ? faCheckCircle : step.icon} />
                    </div>
                    <p
                      className={`mt-2 text-xs text-center font-medium ${
                        step.completed ? 'text-[#3d2c29]' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#b88e72] transition-colors"
                  >
                    {item.product?.images && item.product.images.length > 0 && (
                      <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#3d2c29] mb-1">
                        {item.product?.name || 'Product'}
                      </h3>
                      <p className="text-sm text-[#8b6d5a]">Quantity: {item.quantity}</p>
                      <p className="text-sm text-[#8b6d5a]">
                        Price: {formatPrice(item.price)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#b88e72]">{formatPrice(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {shippingAddress && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#b88e72]" />
                  Shipping Address
                </h2>
                <div className="text-[#8b6d5a]">
                  <p className="font-medium text-[#3d2c29]">{shippingAddress.street}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}
                  </p>
                  <p>{shippingAddress.country}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#3d2c29] mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shipping_cost)}</span>
                </div>
                <div className="flex justify-between text-[#8b6d5a]">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#3d2c29] pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#b88e72]">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {order.payment && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#3d2c29] mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-[#b88e72]" />
                  Payment
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8b6d5a]">Method:</span>
                    <span className="text-[#3d2c29] font-medium capitalize">
                      {order.payment.payment_method === 'card' && '💳 Credit/Debit Card'}
                      {order.payment.payment_method === 'paypal' && '💰 PayPal'}
                      {order.payment.payment_method === 'cod' && '💵 Cash on Delivery'}
                      {!['card', 'paypal', 'cod'].includes(order.payment.payment_method) && 
                        order.payment.payment_method}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8b6d5a]">Status:</span>
                    <span
                      className={`font-medium capitalize ${
                        order.payment.status === 'completed'
                          ? 'text-green-600'
                          : order.payment.status === 'failed'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {order.payment.status}
                    </span>
                  </div>
                  {order.payment.transaction_id && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8b6d5a]">Transaction:</span>
                      <span className="text-[#3d2c29] text-xs font-mono">
                        {order.payment.transaction_id.substring(0, 16)}...
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8b6d5a]">Amount:</span>
                    <span className="text-[#b88e72] font-bold">
                      {formatPrice(order.payment.amount)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => router.push('/products')}
                className="w-full px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.print()}
                className="w-full px-6 py-3 bg-gray-100 text-[#3d2c29] hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Print Order
              </button>
              {canCancelOrder(order.status) && (
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                >
                  {isCancelling ? 'Cancelling Order...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
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
        <OrderDetailContent />
      </ProtectedRoute>
    </Suspense>
  );
}
