'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faShoppingCart,
  faUsers,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import {api} from '@/lib/api';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // You'll need to create these endpoints
      const [products, orders, users] = await Promise.all([
        api.get('/products?limit=1'),
        api.get('/orders?limit=1'),
        api.get('/users?limit=1'),
      ]);

      setStats({
        totalProducts: products.data.total || 0,
        totalOrders: orders.data.total || 0,
        totalUsers: users.data.total || 0,
        totalRevenue: 0, // Calculate from orders
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: faBox,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: faShoppingCart,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: faUsers,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: faDollarSign,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="w-7 h-7 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products/new"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-[#b88e72]"
          >
            <h3 className="font-semibold text-gray-900">Add New Product</h3>
            <p className="mt-1 text-sm text-gray-600">
              Create a new product listing
            </p>
          </a>
          <a
            href="/admin/orders"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-[#b88e72]"
          >
            <h3 className="font-semibold text-gray-900">View Orders</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage customer orders
            </p>
          </a>
          <a
            href="/admin/categories"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-[#b88e72]"
          >
            <h3 className="font-semibold text-gray-900">Manage Categories</h3>
            <p className="mt-1 text-sm text-gray-600">
              Organize product categories
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
