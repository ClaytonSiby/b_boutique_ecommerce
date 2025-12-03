'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faShoppingCart,
  faDollarSign,
  faUsers,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils/currency';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export default function AnalyticsAdmin() {
  const [data, setData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const fetchAnalytics = async () => {
    try {
      // This endpoint needs to be implemented in the backend
      const response = await api.get<AnalyticsData>(
        `/api/v1/analytics?range=${timeRange}`
      );
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const metrics = [
    {
      name: 'Total Revenue',
      value: formatCurrency(data.totalRevenue),
      growth: data.revenueGrowth,
      icon: faDollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Total Orders',
      value: data.totalOrders.toLocaleString(),
      growth: data.ordersGrowth,
      icon: faShoppingCart,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Total Customers',
      value: data.totalCustomers.toLocaleString(),
      growth: 0,
      icon: faUsers,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Avg Order Value',
      value: formatCurrency(data.averageOrderValue),
      growth: 0,
      icon: faChartLine,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            Track your store performance and metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === 'week'
                ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === 'month'
                ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === 'year'
                ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-8 h-8 text-[#b88e72] animate-spin"
          />
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.name}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {metric.name}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    {metric.growth !== 0 && (
                      <p
                        className={`mt-2 text-sm font-medium ${
                          metric.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {metric.growth > 0 ? '+' : ''}
                        {metric.growth}% from last period
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-14 h-14 rounded-xl bg-linear-to-br ${metric.color} flex items-center justify-center shrink-0`}
                  >
                    <FontAwesomeIcon
                      icon={metric.icon}
                      className="w-7 h-7 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Revenue Trend
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Chart component will be rendered here
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Top Products
              </h2>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Chart component will be rendered here
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
