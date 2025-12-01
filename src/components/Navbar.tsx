"use client";
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
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
          <Link href="/" className="relative px-4 py-2 text-[#3d2c29] hover:text-[#b88e72] font-medium transition-all group">
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/products" className="relative px-4 py-2 text-[#3d2c29] hover:text-[#b88e72] font-medium transition-all group">
            <span className="relative z-10">Shop</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/about" className="relative px-4 py-2 text-[#3d2c29] hover:text-[#b88e72] font-medium transition-all group">
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/blog" className="relative px-4 py-2 text-[#3d2c29] hover:text-[#b88e72] font-medium transition-all group">
            <span className="relative z-10">Blog</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/contact" className="relative px-4 py-2 text-[#3d2c29] hover:text-[#b88e72] font-medium transition-all group">
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">3</span>
          </Link>
          
          {/* Profile */}
          <Link href="/profile" className="w-10 h-10 flex items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:scale-110 hover:bg-[#f7e6e1]/50 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#3d2c29] hover:text-[#b88e72] transition-all hover:bg-[#f7e6e1]/50 rounded-full"
            title="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
