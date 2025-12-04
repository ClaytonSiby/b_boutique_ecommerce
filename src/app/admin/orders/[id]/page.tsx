"use client";


import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { OrderStatus } from '@/lib/types';
import { formatCurrency } from "@/lib/utils/currency";
import type { Order, OrderItem, User } from '@/lib/types';

// Helper for status options
const ORDER_STATUS_OPTIONS = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

type AdminOrder = Order & {
  order_number?: string;
  subtotal?: number;
  tax?: number;
  shipping_cost?: number;
  total?: number;
  order_items?: OrderItem[];
  shipping_address_id?: string;
  billing_address_id?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
};



export default function AdminOrderDetailPage() {
  // Status update state/hooks must be inside the component
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [statusSuccess, setStatusSuccess] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keep selectedStatus in sync with order
  useEffect(() => {
    if (order?.status) setSelectedStatus(order.status);
  }, [order?.status]);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrderAndUser = async () => {
      setLoading(true);
      try {
        const response = await api.get<Order>(`/api/v1/orders/${orderId}`);
        setOrder(response.data);
        if (response.data.user_id) {
          try {
            const userRes = await api.get<User>(`/api/v1/users/${response.data.user_id}`);
            setUser(userRes.data);
          } catch {
            setUser(null); // User fetch failed, but don't block order
          }
        }
      } catch {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderAndUser();
  }, [orderId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#3d2c29] text-lg">Loading order details...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Error</h2>
          <p className="text-[#8b6d5a] mb-6">{error}</p>
          <button onClick={() => router.back()} className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium">Back</button>
        </div>
      </div>
    );
  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#3d2c29] mb-4">Order Not Found</h2>
          <p className="text-[#8b6d5a] mb-6">The order you are looking for does not exist.</p>
          <button onClick={() => router.back()} className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium">Back</button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] pt-24 pb-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          {/* User Details Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#3d2c29] mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div>
                <span className="font-semibold text-[#8b6d5a]">User ID:</span> <span className="text-[#3d2c29]">{user?.id || order.user_id || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#8b6d5a]">Username:</span> <span className="text-[#3d2c29]">{user?.username || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#8b6d5a]">Email:</span> <span className="text-[#3d2c29]">{user?.email || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#8b6d5a]">Account Status:</span> <span className={user?.is_active ? 'text-green-600' : 'text-red-600'}>{user ? (user.is_active ? 'Active' : 'Inactive') : 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#8b6d5a]">Created At:</span> <span className="text-[#3d2c29]">{user?.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}</span>
              </div>
            </div>
          </div>
          {/* Order Details Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#3d2c29] mb-2">Order Details</h1>
            <p className="text-[#8b6d5a]">Order #{order.order_number || order.id}</p>
          </div>
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            <div><span className="font-semibold text-[#8b6d5a]">Order ID:</span> <span className="text-[#3d2c29]">{order.id}</span></div>
            {/* Status update dropdown for admins */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#8b6d5a]">Status:</span>
              <select
                className="rounded-lg border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-[#b88e72] focus:border-transparent outline-none transition-all text-[#3d2c29] bg-white"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                disabled={statusUpdating}
                aria-label="Order Status"
              >
                {ORDER_STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
              <button
                className="ml-2 px-3 py-1 rounded-lg bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white font-medium shadow hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all disabled:opacity-50"
                disabled={statusUpdating || selectedStatus === order.status}
                onClick={async () => {
                  if (!order) return;
                  setStatusUpdating(true);
                  setStatusError("");
                  setStatusSuccess("");
                  try {
                    await api.patch(`/api/v1/orders/${order.id}`, { status: selectedStatus });
                    setOrder({ ...order, status: selectedStatus as OrderStatus });
                    setStatusSuccess("Order status updated.");
                  } catch (err) {
                    setStatusError("Failed to update status.");
                  } finally {
                    setStatusUpdating(false);
                  }
                }}
                type="button"
              >
                {statusUpdating ? 'Saving...' : 'Save'}
              </button>
            </div>
            {statusError && <div className="col-span-2 text-red-600 text-sm mt-1">{statusError}</div>}
            {statusSuccess && <div className="col-span-2 text-green-600 text-sm mt-1">{statusSuccess}</div>}
          </div>
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#3d2c29] mb-4">Order Items</h2>
            <div className="grid gap-4 grid-cols-1">
              {((order.items && order.items.length > 0 ? order.items : order.order_items) || []).map((item: OrderItem) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-stretch bg-[#f7e6e1]/40 rounded-xl shadow p-4 gap-4">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="font-semibold text-[#3d2c29] text-base sm:text-lg mb-1">
                      {item.product ? (
                        <Link href={`/products/${item.product.id}`} className="text-[#b88e72] hover:underline font-medium">
                          {item.product.name}
                        </Link>
                      ) : (
                        <span>{item.product_id}</span>
                      )}
                    </div>
                    {item.product?.sku && (
                      <div className="text-xs text-[#8b6d5a] mb-1">SKU: {item.product.sku}</div>
                    )}
                    <div className="text-xs text-[#8b6d5a]">Item ID: {item.id}</div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between items-end sm:items-center gap-2 sm:gap-0 min-w-[120px]">
                    <div className="text-sm text-[#3d2c29] flex flex-col items-center">
                      <span className="font-medium">Qty</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="text-sm text-[#3d2c29] flex flex-col items-center">
                      <span className="font-medium">Price</span>
                      <span>{formatCurrency(Number(item.price))}</span>
                    </div>
                    <div className="text-sm text-[#b88e72] flex flex-col items-center">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">{formatCurrency(Number(item.price) * Number(item.quantity))}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-end">
            <button onClick={() => router.back()} className="inline-block px-6 py-3 text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-lg transition-all shadow-md hover:shadow-lg font-medium">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
