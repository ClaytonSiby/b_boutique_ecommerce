'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faShoppingBag,
  faUsers,
  faChartLine,
  faPlus,
  faListCheck,
  faTags,
  faArrowRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils/currency';
import Link from 'next/link';

interface RecentOrder {
  id: string;
  order_number: string;
  user_email: string;
  total: number;
  status: string;
  created_at: string;
}

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  statusBreakdown: Record<string, number>;
  recentOrders: RecentOrder[];
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  pending:    { label: 'Pending',    bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'text-amber-500' },
  processing: { label: 'Processing', bg: 'bg-blue-50',    text: 'text-blue-700',   dot: 'text-blue-500' },
  shipped:    { label: 'Shipped',    bg: 'bg-violet-50',  text: 'text-violet-700', dot: 'text-violet-500' },
  delivered:  { label: 'Delivered',  bg: 'bg-emerald-50', text: 'text-emerald-700',dot: 'text-emerald-500' },
  cancelled:  { label: 'Cancelled',  bg: 'bg-red-50',     text: 'text-red-700',    dot: 'text-red-500' },
  refunded:   { label: 'Refunded',   bg: 'bg-gray-100',   text: 'text-gray-700',   dot: 'text-gray-500' },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <FontAwesomeIcon icon={faCircle} className={`w-1.5 h-1.5 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 animate-pulse">
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    statusBreakdown: {},
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, users] = await Promise.all([
          api.get('/api/v1/products/stats'),
          api.get('/api/v1/orders/stats'),
          api.get('/api/v1/users/stats'),
        ]);
        setStats({
          totalProducts: products.data.total ?? 0,
          activeProducts: products.data.active ?? 0,
          totalOrders: orders.data.total ?? 0,
          totalUsers: users.data.total ?? 0,
          totalRevenue: orders.data.total_revenue ?? 0,
          statusBreakdown: orders.data.status_breakdown ?? {},
          recentOrders: orders.data.recent_orders ?? [],
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      sub: `${stats.activeProducts} active`,
      icon: faBox,
      iconBg: 'bg-blue-500',
      border: 'border-blue-100',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      sub: `${stats.statusBreakdown.pending ?? 0} pending`,
      icon: faShoppingBag,
      iconBg: 'bg-[#b88e72]',
      border: 'border-[#f0d9cc]',
    },
    {
      label: 'Total Customers',
      value: stats.totalUsers,
      sub: 'registered accounts',
      icon: faUsers,
      iconBg: 'bg-violet-500',
      border: 'border-violet-100',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      sub: 'all time',
      icon: faChartLine,
      iconBg: 'bg-emerald-500',
      border: 'border-emerald-100',
    },
  ];

  const quickActions = [
    { label: 'Add Product',       desc: 'Create a new listing',       icon: faPlus,      href: '/admin/products/new',  color: 'text-[#b88e72]', bg: 'bg-[#fdf6f0]' },
    { label: 'Manage Orders',     desc: 'View & update orders',       icon: faListCheck, href: '/admin/orders',        color: 'text-blue-600',   bg: 'bg-blue-50' },
    { label: 'Categories',        desc: 'Organise product categories', icon: faTags,      href: '/admin/categories',    color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  const totalOrdersForBar = Math.max(stats.totalOrders, 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Store overview and recent activity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          : statCards.map((card) => (
              <div key={card.label} className={`bg-white rounded-2xl border ${card.border} p-6 hover:shadow-md transition-shadow`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="mt-1 text-xs text-gray-400">{card.sub}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                    <FontAwesomeIcon icon={card.icon} className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#b88e72] hover:underline flex items-center gap-1">
              View all <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/5" />
                </div>
              ))}
            </div>
          ) : stats.recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <FontAwesomeIcon icon={faShoppingBag} className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-medium">Order</th>
                    <th className="px-6 py-3 text-left font-medium">Customer</th>
                    <th className="px-6 py-3 text-left font-medium">Date</th>
                    <th className="px-6 py-3 text-right font-medium">Total</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="font-medium text-gray-900 hover:text-[#b88e72]">
                          #{order.order_number}
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-gray-500 truncate max-w-[160px]">{order.user_email}</td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">{formatCurrency(order.total)}</td>
                      <td className="px-6 py-3"><StatusBadge status={order.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Order Status Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Order Status</h2>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />)}
              </div>
            ) : stats.totalOrders === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {statusOrder.map((status) => {
                  const count = stats.statusBreakdown[status] ?? 0;
                  if (count === 0) return null;
                  const cfg = STATUS_CONFIG[status];
                  const pct = Math.round((count / totalOrdersForBar) * 100);
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
                        <span className="text-xs text-gray-500">{count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cfg.bg.replace('bg-', 'bg-').replace('-50', '-400').replace('-100', '-400')} w-(--bar-w)`}
                          // @ts-expect-error CSS custom property
                          style={{ '--bar-w': `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}>
                    <FontAwesomeIcon icon={action.icon} className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#b88e72] transition-colors">{action.label}</p>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-gray-300 group-hover:text-[#b88e72] ml-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
