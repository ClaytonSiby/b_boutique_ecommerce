"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faBox, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname ? pathname.startsWith(path) : false;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full backdrop-blur-2xl bg-white/90 border-b border-gray-200/30 fixed top-0 left-0 z-50 shadow-xl shadow-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#b88e72] to-[#8b6d5a] flex items-center justify-center shadow-lg group-hover:shadow-[#b88e72]/40 transition-all duration-300 group-hover:scale-110">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent tracking-wide">Boutique</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className={`relative px-4 py-2 font-medium transition-all group ${isActive('/') ? 'text-[#b88e72]' : 'text-[#3d2c29] hover:text-[#b88e72]'}`}>
            <span className="relative z-10">Home</span>
            <div className={`absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full transition-opacity ${isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </Link>
          <Link href="/products" className={`relative px-4 py-2 font-medium transition-all group ${isActive('/products') ? 'text-[#b88e72]' : 'text-[#3d2c29] hover:text-[#b88e72]'}`}>
            <span className="relative z-10">Shop</span>
            <div className={`absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full transition-opacity ${isActive('/products') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </Link>
          <Link href="/about" className={`relative px-4 py-2 font-medium transition-all group ${isActive('/about') ? 'text-[#b88e72]' : 'text-[#3d2c29] hover:text-[#b88e72]'}`}>
            <span className="relative z-10">About</span>
            <div className={`absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full transition-opacity ${isActive('/about') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </Link>
          <Link href="/blog" className={`relative px-4 py-2 font-medium transition-all group ${isActive('/blog') ? 'text-[#b88e72]' : 'text-[#3d2c29] hover:text-[#b88e72]'}`}>
            <span className="relative z-10">Blog</span>
            <div className={`absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full transition-opacity ${isActive('/blog') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </Link>
          <Link href="/contact" className={`relative px-4 py-2 font-medium transition-all group ${isActive('/contact') ? 'text-[#b88e72]' : 'text-[#3d2c29] hover:text-[#b88e72]'}`}>
            <span className="relative z-10">Contact</span>
            <div className={`absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full transition-opacity ${isActive('/contact') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
          </Link>
        </div>
        
        {/* Right Actions */}
        <div className="flex gap-3 items-center">
          {/* Search Button */}
          <button className="hidden md:flex w-10 h-10 items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:scale-110 hover:bg-[#f7e6e1]/50 rounded-full" title="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
          
          {/* Cart with Badge */}
          <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:scale-110 hover:bg-[#f7e6e1]/50 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7"/></svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          {/* Profile / Auth */}
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-10 h-10 flex items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:scale-110 hover:bg-[#f7e6e1]/50 rounded-full"
                aria-label="Profile menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200/50 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-[#3d2c29]">{user.username}</p>
                    <p className="text-xs text-[#8b6d5a] truncate">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  {user.is_admin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#3d2c29] hover:bg-[#f7e6e1]/50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <svg className="w-4 h-4 text-[#b88e72]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H13V3.055z"/></svg>
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#3d2c29] hover:bg-[#f7e6e1]/50 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-[#b88e72]" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#3d2c29] hover:bg-[#f7e6e1]/50 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-[#b88e72]" />
                    <span>Favorites</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#3d2c29] hover:bg-[#f7e6e1]/50 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <FontAwesomeIcon icon={faBox} className="w-4 h-4 text-[#b88e72]" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-[#3d2c29] hover:bg-[#f7e6e1]/50 transition-colors"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <FontAwesomeIcon icon={faCog} className="w-4 h-4 text-[#b88e72]" />
                    <span>Settings</span>
                  </Link>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileDropdown(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#3d2c29] hover:text-[#b88e72] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:bg-[#f7e6e1]/50 rounded-full"
            title="Open mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-60">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          {/* Panel */}
          <div ref={mobileRef} className="absolute right-0 top-0 h-full w-11/12 max-w-sm bg-white shadow-2xl border-l border-gray-200 flex flex-col">
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-200">
              <span className="text-lg font-semibold text-[#3d2c29]">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f7e6e1]/60">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-2">
            <Link href="/" className={`block px-2 py-2 ${isActive('/') ? 'text-[#b88e72]' : 'text-[#3d2c29]'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/products" className={`block px-2 py-2 ${isActive('/products') ? 'text-[#b88e72]' : 'text-[#3d2c29]'}`} onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/about" className={`block px-2 py-2 ${isActive('/about') ? 'text-[#b88e72]' : 'text-[#3d2c29]'}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/blog" className={`block px-2 py-2 ${isActive('/blog') ? 'text-[#b88e72]' : 'text-[#3d2c29]'}`} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/contact" className={`block px-2 py-2 ${isActive('/contact') ? 'text-[#b88e72]' : 'text-[#3d2c29]'}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="border-t border-gray-200 my-2" />
            {isAuthenticated && user ? (
              <div className="space-y-2">
                {user.is_admin && (
                  <Link href="/admin" className="block px-2 py-2 text-[#3d2c29]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                )}
                <Link href="/profile" className="block px-2 py-2 text-[#3d2c29]" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                <Link href="/orders" className="block px-2 py-2 text-[#3d2c29]" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                <Link href="/settings" className="block px-2 py-2 text-[#3d2c29]" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-2 py-2 text-red-600">Sign Out</button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-[#3d2c29] bg-[#f7e6e1]/60 hover:bg-[#f7e6e1] rounded-full transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] rounded-full transition-colors shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
