'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBox,
  faList,
  faShoppingCart,
  faUsers,
  faChartLine,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirect=/admin');
      } else if (!user?.is_admin) {
        router.push('/');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b88e72] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.is_admin) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: faHome },
    { name: 'Products', href: '/admin/products', icon: faBox },
    { name: 'Categories', href: '/admin/categories', icon: faList },
    { name: 'Orders', href: '/admin/orders', icon: faShoppingCart },
    { name: 'Users', href: '/admin/users', icon: faUsers },
    { name: 'Analytics', href: '/admin/analytics', icon: faChartLine },
    { name: 'Settings', href: '/admin/settings', icon: faCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b88e72] to-[#8b6d5a] flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#3d2c29]">Admin Panel</h1>
              <p className="text-xs text-gray-500">Benedetto Boutique</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-[#f7e6e1] hover:text-[#b88e72] transition-colors group"
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-[#b88e72] flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
