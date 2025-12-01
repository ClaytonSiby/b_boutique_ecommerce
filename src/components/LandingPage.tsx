"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

export default function LandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex flex-col pb-32 pt-20">

      {/* Hero Section - Sale Promo & Brands */}
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-linear-to-br from-white via-[#f7e6e1]/10 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#b88e72] via-transparent to-transparent"></div>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          <div className="flex-1 flex flex-col items-center md:items-start gap-4 md:gap-6 animate-fade-in">
            <span className="px-3 md:px-4 py-2 bg-linear-to-br from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-xs sm:text-sm font-semibold border border-[#b88e72]/20">SEASON SALE - UP TO 70% OFF</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-br from-[#3d2c29] via-[#b88e72] to-[#3d2c29] bg-clip-text text-transparent mb-2 text-center md:text-left drop-shadow-lg leading-tight">Discover Your <span className="bg-linear-to-br from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Perfect Style</span></h1>
            <p className="text-base sm:text-lg md:text-xl text-[#3d2c29]/70 mb-4 md:mb-6 text-center md:text-left max-w-lg">Elevate your wardrobe with our curated collection of premium fashion. From timeless classics to contemporary trends.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
              <Link href="/products" className="group inline-block px-8 md:px-10 py-3 md:py-4 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] text-white rounded-full shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-105 hover:from-[#8b6d5a] hover:to-[#b88e72] font-semibold text-center">Shop Now<span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span></Link>
              <Link href="/about" className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#3d2c29] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold border border-gray-200 text-center">Learn More</Link>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center justify-center">
            <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-44 md:h-56 lg:w-[180px] lg:h-60 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#b88e72]/30 transition-all duration-300 hover:scale-105 hover:-rotate-2 ring-2 ring-white/50 group">
              <Image src="/assets/images/colour_dress.jpg" alt="Hero 1" width={180} height={240} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#d4a574]/15"></div>
            </div>
            <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-44 md:h-56 lg:w-[180px] lg:h-60 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#b88e72]/30 transition-all duration-300 hover:scale-110 ring-2 ring-white/50 group">
              <Image src="/assets/images/perfume.jpg" alt="Hero 2" width={180} height={240} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#b88e72]/15"></div>
            </div>
            <div className="hidden sm:block relative w-32 h-40 md:w-44 md:h-56 lg:w-[180px] lg:h-60 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#b88e72]/30 transition-all duration-300 hover:scale-105 hover:rotate-2 ring-2 ring-white/50 group">
              <Image src="/assets/images/trendy.jpg" alt="Hero 3" width={180} height={240} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#e8d5c4]/15"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-8 flex-wrap">
          <Image src="/assets/images/chanel_logo.png" alt="Chanel" width={80} height={32} className="w-16 h-auto sm:w-20" />
          <Image src="/assets/images/prada_logo.png" alt="Prada" width={80} height={32} className="w-16 h-auto sm:w-20" />
          <Image src="/assets/images/calvin_klein_logo.png" alt="Calvin Klein" width={80} height={32} className="w-16 h-auto sm:w-20" />
          <Image src="/assets/images/emporio_logo.jpg" alt="Emporio" width={80} height={32} className="w-16 h-auto sm:w-20" />
        </div>
      </section>

      {/* Deals of the Month */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-20 bg-linear-to-br from-[#f7e6e1] via-white to-[#f7e6e1] mx-4 md:mx-12 lg:mx-24 rounded-3xl shadow-2xl mt-8 md:mt-12 backdrop-blur-sm border border-white/50">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-4">Deals Of The Month</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-4">Limited time offers on selected items. Don&apos;t miss out on these exclusive deals!</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-gray-100 w-full md:w-auto">
            <span className="text-base sm:text-lg font-semibold text-[#3d2c29] mb-2 text-center">Black Weekend Mega Sale</span>
            <div className="flex gap-2 sm:gap-3 mb-4">
              <div className="flex flex-col items-center"><span className="text-xl sm:text-2xl font-bold text-[#b88e72]">02</span><span className="text-xs text-[#3d2c29]">Days</span></div>
              <div className="flex flex-col items-center"><span className="text-xl sm:text-2xl font-bold text-[#b88e72]">16</span><span className="text-xs text-[#3d2c29]">Hours</span></div>
              <div className="flex flex-col items-center"><span className="text-xl sm:text-2xl font-bold text-[#b88e72]">35</span><span className="text-xs text-[#3d2c29]">Min</span></div>
              <div className="flex flex-col items-center"><span className="text-xl sm:text-2xl font-bold text-[#b88e72]">21</span><span className="text-xs text-[#3d2c29]">Sec</span></div>
            </div>
            <Link href="/products/deal" className="px-6 py-2 bg-[#b88e72] text-white rounded-full shadow hover:bg-[#a67c52] text-sm sm:text-base">Shop Now</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full md:w-auto">
            <Image src="/assets/images/deal1.jpg" alt="Deal 1" width={120} height={180} className="rounded-2xl object-cover shadow-2xl hover:shadow-[#b88e72]/40 transition-all duration-300 hover:scale-110 ring-2 ring-white/30 w-full h-auto" />
            <Image src="/assets/images/deal2.jpg" alt="Deal 2" width={120} height={180} className="rounded-2xl object-cover shadow-2xl hover:shadow-[#b88e72]/40 transition-all duration-300 hover:scale-110 ring-2 ring-white/30 w-full h-auto" />
            <Image src="/assets/images/deal3.jpg" alt="Deal 3" width={120} height={180} className="rounded-2xl object-cover shadow-2xl hover:shadow-[#b88e72]/40 transition-all duration-300 hover:scale-110 ring-2 ring-white/30 w-full h-auto" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-br from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-4">New Arrivals</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">Discover our latest collection featuring the newest trends in fashion. Carefully curated pieces that blend style with comfort.</p>
          </div>
          
          {/* Category Filters */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 flex-wrap px-2">
            <button className="px-4 sm:px-6 py-2 rounded-full bg-linear-to-r from-[#3d2c29] to-[#2d1f1c] text-white font-medium hover:shadow-xl hover:shadow-[#3d2c29]/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base">Women&apos;s Fashion</button>
            <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-[#3d2c29] font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#b88e72] hover:scale-105 hover:shadow-lg text-sm sm:text-base">Men&apos;s Fashion</button>
            <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-[#3d2c29] font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#b88e72] hover:scale-105 hover:shadow-lg text-sm sm:text-base">Women Accessories</button>
            <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-[#3d2c29] font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#b88e72] hover:scale-105 hover:shadow-lg text-sm sm:text-base">Men Accessories</button>
            <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-[#3d2c29] font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-[#b88e72] hover:scale-105 hover:shadow-lg text-sm sm:text-base">Discount Deals</button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Product Card 1 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#e7d6c6] to-[#d4c5b6] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new1.jpg" alt="Shiny Dress" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">Shiny Dress</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#e0d5c7] to-[#d0c5b7] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new2.jpg" alt="Long Dress" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">Long Dress</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#d4e4dc] to-[#c4d4cc] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new3.jpg" alt="Full Sweater" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">Full Sweater</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#e7d6c6] to-[#d7c6b6] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new4.jpg" alt="White Dress" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">White Dress</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#d4dae4] to-[#c4cad4] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new5.jpg" alt="Colorful Dress" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">Colorful Dress</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-linear-to-br from-[#e8e8e8] to-[#d8d8d8] h-64 flex items-center justify-center overflow-hidden">
                <Image src="/assets/images/new6.jpg" alt="White Shirt" width={240} height={240} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#3d2c29] text-lg mb-1">White Shirt</h3>
                <p className="text-gray-500 text-sm mb-2">Al Karam</p>
                <div className="flex gap-1 mb-2 text-[#ffa500]">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-500 text-sm mb-3">(4.1k) Customer Reviews</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#3d2c29]">$95.50</span>
                  <span className="text-red-500 text-sm">Almost Sold Out</span>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <Link href="/products" className="group px-10 py-3 bg-linear-to-r from-[#3d2c29] to-[#2d1f1c] text-white rounded-full font-medium hover:from-[#2d1f1c] hover:to-[#3d2c29] transition-all duration-300 shadow-2xl hover:shadow-[#3d2c29]/50 hover:scale-105">
              View More<span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Product Highlight - Peaky Blinders */}
      <section className="relative px-4 md:px-8 py-0 mx-4 md:mx-12 lg:mx-24 rounded-3xl shadow-2xl mt-8 md:mt-12 overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-[#2d1f1c] via-[#3d2c29] to-[#1d0f0c]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(184,142,114,0.2),transparent_70%)]"></div>
        
        {/* Content Container */}
        <div className="relative z-10 grid md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16 space-y-4 md:space-y-6">
            <div className="inline-block w-fit">
              <span className="px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md text-[#f7e6e1] text-xs font-semibold rounded-full border border-white/20">EXCLUSIVE COLLECTION</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Peaky <span className="bg-linear-to-r from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent">Blinders</span>
            </h3>
            
            <p className="text-sm sm:text-base md:text-lg text-[#f7e6e1]/80 max-w-md leading-relaxed">
              Step into the world of 1920s Birmingham with our exclusive collection. Meticulously crafted pieces inspired by classic British elegance and timeless sophistication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/products/peaky-blinders" className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-105 font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] text-center text-sm sm:text-base">
                Shop Collection
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/collections/peaky-blinders" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 font-semibold text-center text-sm sm:text-base">
                Learn More
              </Link>
            </div>
            
            {/* Feature Tags */}
            <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 flex-wrap">
              <span className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm text-[#f7e6e1]/70 text-xs sm:text-sm rounded-full border border-white/10">✓ Premium Quality</span>
              <span className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm text-[#f7e6e1]/70 text-xs sm:text-sm rounded-full border border-white/10">✓ Limited Edition</span>
              <span className="px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-sm text-[#f7e6e1]/70 text-xs sm:text-sm rounded-full border border-white/10">✓ Authentic Style</span>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <div className="absolute inset-0">
              <Image src="/assets/images/formal.jpg" alt="Peaky Blinders Collection" width={600} height={500} className="object-cover w-full h-full" />
            </div>
            {/* Gradient Overlay on Image */}
            <div className="absolute inset-0 bg-linear-to-r from-[#3d2c29] via-transparent to-transparent opacity-60"></div>
            {/* Decorative Corner Element */}
            <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-[#b88e72]/30 rounded-tr-[60px]"></div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="relative px-4 sm:px-6 md:px-8 py-12 md:py-16 mx-4 md:mx-12 lg:mx-24 rounded-3xl mt-8 md:mt-12 overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-linear-to-br from-white via-[#f7e6e1]/30 to-white"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-[#b88e72]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-[#8b6d5a]/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Worldwide Shipping */}
          <div className="group flex flex-col items-center text-center gap-4 p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-[#b88e72]/50 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#3d2c29]">Worldwide Shipping</h4>
              <p className="text-[#3d2c29]/70 text-sm leading-relaxed">Fast and reliable delivery to your doorstep, anywhere in the world</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="group flex flex-col items-center text-center gap-4 p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 bg-linear-to-br from-[#8b6d5a] to-[#6b5d4a] rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-[#8b6d5a]/50 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#3d2c29]">24/7 Support</h4>
              <p className="text-[#3d2c29]/70 text-sm leading-relaxed">Our dedicated team is always here to assist you, day or night</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="group flex flex-col items-center text-center gap-4 p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#b88e72]/20 transition-all duration-300 hover:-translate-y-2 border border-white/50">
            <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-[#b88e72]/50 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-[#3d2c29]">Easy Returns</h4>
              <p className="text-[#3d2c29]/70 text-sm leading-relaxed">Hassle-free 30-day return policy for your complete satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-3 sm:px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-xs sm:text-sm font-semibold border border-[#b88e72]/20 mb-4 sm:mb-6">SHOP BY CATEGORY</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-4">Trending Categories</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">Discover our curated collections featuring the season&apos;s most sought-after styles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {/* Dresses */}
            <Link href="/categories/dresses" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image src="/assets/images/dress_.jpg" alt="Dresses" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#b88e72]/20"></div>
              <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/90 via-[#3d2c29]/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
              
              <div className="relative p-8 h-72 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                  </div>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#b88e72] text-xs font-bold rounded-full">HOT</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">Dresses</h3>
                  <p className="text-white/90 text-sm font-medium">250+ items</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm pt-2 group-hover:gap-3 transition-all">
                    <span>Explore Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Accessories */}
            <Link href="/categories/accessories" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image src="/assets/images/deals.jpg" alt="Accessories" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#d4a574]/20"></div>
              <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/90 via-[#3d2c29]/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
              
              <div className="relative p-8 h-72 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </div>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#8b6d5a] text-xs font-bold rounded-full">NEW</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">Accessories</h3>
                  <p className="text-white/90 text-sm font-medium">180+ items</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm pt-2 group-hover:gap-3 transition-all">
                    <span>Explore Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Footwear */}
            <Link href="/categories/shoes" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image src="/assets/images/sneakers_.jpg" alt="Footwear" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#6b8cae]/20"></div>
              <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/90 via-[#3d2c29]/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
              
              <div className="relative p-8 h-72 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  </div>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3d2c29] text-xs font-bold rounded-full">SALE</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">Footwear</h3>
                  <p className="text-white/90 text-sm font-medium">120+ items</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm pt-2 group-hover:gap-3 transition-all">
                    <span>Explore Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Bags */}
            <Link href="/categories/bags" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image src="/assets/images/handbag.jpg" alt="Bags" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#e8d5c4]/20"></div>
              <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/90 via-[#3d2c29]/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500"></div>
              
              <div className="relative p-8 h-72 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  </div>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#b88e72] text-xs font-bold rounded-full">TRENDING</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">Bags</h3>
                  <p className="text-white/90 text-sm font-medium">95+ items</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm pt-2 group-hover:gap-3 transition-all">
                    <span>Explore Collection</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Statistics */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-linear-to-r from-[#3d2c29] via-[#4d3c39] to-[#3d2c29] mx-4 md:mx-12 lg:mx-24 rounded-3xl shadow-2xl mt-6 md:mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-br from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent mb-2">15K+</div>
            <div className="text-[#f7e6e1]/80 text-xs sm:text-sm">Happy Customers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-br from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-[#f7e6e1]/80 text-xs sm:text-sm">Products</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-br from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent mb-2">98%</div>
            <div className="text-[#f7e6e1]/80 text-xs sm:text-sm">Satisfaction Rate</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-br from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-[#f7e6e1]/80 text-xs sm:text-sm">Countries</div>
          </div>
        </div>
      </section>

      {/* Blog/Style Tips Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3d2c29] mb-4">Fashion & Style Tips</h2>
          <p className="text-sm sm:text-base text-center text-gray-500 mb-8 md:mb-12 max-w-2xl mx-auto px-4">Stay updated with the latest fashion trends and styling advice</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Link href="/blog/summer-trends" className="group">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-[#f7e6e1] to-[#e7d6c6] relative overflow-hidden">
                  <Image src="/assets/images/summer_style.jpg" alt="Summer Trends" width={400} height={192} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#f7a76c]/20"></div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#b88e72] font-semibold">FASHION TRENDS</span>
                  <h3 className="text-xl font-bold text-[#3d2c29] mt-2 mb-3 group-hover:text-[#b88e72] transition-colors">Summer 2024 Must-Have Styles</h3>
                  <p className="text-gray-600 text-sm mb-4">Discover the hottest trends this summer season and how to style them effortlessly.</p>
                  <span className="text-[#b88e72] text-sm font-medium group-hover:underline">Read More →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/styling-guide" className="group">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-[#e7d6c6] to-[#d7c6b6] relative overflow-hidden">
                  <Image src="/assets/images/mix_and_match.jpg" alt="Styling Guide" width={400} height={192} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#b88e72]/20"></div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#b88e72] font-semibold">STYLING TIPS</span>
                  <h3 className="text-xl font-bold text-[#3d2c29] mt-2 mb-3 group-hover:text-[#b88e72] transition-colors">How to Mix & Match Your Wardrobe</h3>
                  <p className="text-gray-600 text-sm mb-4">Learn professional tips to create stunning outfits with pieces you already own.</p>
                  <span className="text-[#b88e72] text-sm font-medium group-hover:underline">Read More →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/accessories" className="group">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-[#d4dae4] to-[#c4cad4] relative overflow-hidden">
                  <Image src="/assets/images/accessories.jpg" alt="Accessories" width={400} height={192} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#9ca8c4]/20"></div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#b88e72] font-semibold">ACCESSORIES</span>
                  <h3 className="text-xl font-bold text-[#3d2c29] mt-2 mb-3 group-hover:text-[#b88e72] transition-colors">Elevate Your Look with Accessories</h3>
                  <p className="text-gray-600 text-sm mb-4">The ultimate guide to choosing and styling accessories for any occasion.</p>
                  <span className="text-[#b88e72] text-sm font-medium group-hover:underline">Read More →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="relative w-full py-24 overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#f8f8f8] via-white to-[#f7e6e1]/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-[#b88e72]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-tl from-[#8b6d5a]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">TESTIMONIALS</span>
            <h2 className="text-5xl font-extrabold text-[#3d2c29] mb-4">
              What Our <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Happy Customers</span> Say
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Join thousands of satisfied customers who have transformed their style with B Boutique</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="relative px-4 sm:px-6 md:px-8 py-12 md:py-20 mx-4 md:mx-12 lg:mx-24 rounded-3xl mt-6 md:mt-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#f7e6e1] via-white to-[#e7d6c6] opacity-90"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#b88e72]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-[#8b6d5a]/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 flex flex-col gap-4 md:gap-6 items-center md:items-start">
            <div className="inline-block px-3 sm:px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-[#b88e72]/30 shadow-lg">
              <span className="text-[#b88e72] text-xs sm:text-sm font-semibold">✨ JOIN OUR COMMUNITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3d2c29] mb-2 text-center md:text-left leading-tight">
              Stay <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">In Style</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#3d2c29]/70 mb-4 md:mb-6 text-center md:text-left max-w-md">
              Subscribe to receive exclusive offers, early access to new collections, and insider fashion tips delivered to your inbox.
            </p>
            <form className="w-full max-w-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent shadow-lg placeholder:text-gray-400 transition-all duration-300 hover:bg-white text-sm sm:text-base" 
                />
                <button 
                  type="submit" 
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-2xl shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-105 font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] whitespace-nowrap text-sm sm:text-base"
                >
                  Subscribe Now
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              <p className="text-xs text-[#3d2c29]/60 mt-3 text-center sm:text-left">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
          <div className="flex-1 flex justify-center gap-3 sm:gap-4">
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Image src="/assets/images/newsletter_1.jpg" alt="Newsletter 1" width={200} height={280} className="relative rounded-2xl object-cover shadow-2xl ring-2 ring-white/50 group-hover:scale-105 transition-transform duration-300 w-32 h-44 sm:w-40 sm:h-56 md:w-[200px] md:h-[280px]" />
              <div className="absolute inset-0 bg-[#e8d5c4]/15 rounded-2xl"></div>
            </div>
            <div className="relative group mt-6 sm:mt-8 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-[#8b6d5a] to-[#b88e72] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Image src="/assets/images/newsletter_2.jpg" alt="Newsletter 2" width={200} height={280} className="relative rounded-2xl object-cover shadow-2xl ring-2 ring-white/50 group-hover:scale-105 transition-transform duration-300 w-32 h-44 sm:w-40 sm:h-56 md:w-[200px] md:h-[280px]" />
              <div className="absolute inset-0 bg-[#b88e72]/15 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 mt-0 overflow-hidden">
        {/* Elegant Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#2d1f1c] via-[#3d2c29] to-[#2d1f1c]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.15),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Logo & Description */}
          <div className="text-center mb-8 md:mb-12">
            <Link href="/" className="inline-block text-3xl sm:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent tracking-wide mb-4">B Boutique</Link>
            <p className="text-sm sm:text-base text-[#f7e6e1]/70 max-w-md mx-auto px-4">Your destination for premium fashion and timeless elegance</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Social Media */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 text-[#1877F2] hover:text-white transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener" title="Twitter" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#1DA1F2] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 text-[#1DA1F2] hover:text-white transition-colors" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-linear-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-[#E1306C] hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Info Links */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Information</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
                <li><Link href="/blog" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link href="/return-policy" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Return Policy</Link></li>
                <li><Link href="/shipping-policy" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Shipping Info</Link></li>
                <li><Link href="/terms" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
              </ul>
            </div>
            
            {/* Customer Service */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Customer Service</h4>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</Link></li>
                <li><Link href="/faq" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">FAQ</Link></li>
                <li><Link href="/size-guide" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Size Guide</Link></li>
                <li><Link href="/track-order" className="text-[#f7e6e1]/70 hover:text-[#b88e72] transition-colors duration-300 hover:translate-x-1 inline-block">Track Order</Link></li>
              </ul>
            </div>
            
            {/* Payment Icons */}
            <div>
              <h4 className="font-bold text-[#f7e6e1] mb-6 text-lg">Secure Payments</h4>
              <div className="flex gap-3 flex-wrap">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcVisa} className="text-[#1A1F71] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcMastercard} className="text-[#FF5F00] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcPaypal} className="text-[#003087] text-2xl" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center hover:scale-110 transition-all shadow-md">
                  <FontAwesomeIcon icon={faCcApplePay} className="text-black text-2xl" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-[#b88e72]/30 to-transparent mb-8"></div>
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#f7e6e1]/60 text-sm">© {new Date().getFullYear()} B Boutique. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Cookies</Link>
              <Link href="/accessibility" className="text-[#f7e6e1]/60 hover:text-[#b88e72] transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
        
        {/* Chat Icon */}
        <button
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] hover:from-[#8b6d5a] hover:to-[#b88e72] text-white rounded-full shadow-2xl hover:shadow-[#b88e72]/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          onClick={() => setChatOpen((open) => !open)}
          aria-label="Chat"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </button>
        {chatOpen && (
          <div className="fixed bottom-20 md:bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl p-4 sm:p-6 z-50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#3d2c29] text-base sm:text-lg">Chat with us</span>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-[#b88e72] transition-colors text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 text-sm text-gray-700">
              <p>Hello! How can we help you today?</p>
            </div>
            <form className="flex gap-2">
              <input type="text" placeholder="Type your message..." className="flex-1 px-3 sm:px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent text-sm" />
              <button type="submit" className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white px-4 sm:px-6 py-2 rounded-full hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all text-sm">Send</button>
            </form>
          </div>
        )}
      </footer>
      </div>
  );
}

// Carousel component
function TestimonialCarousel() {
  const testimonials = [
    {
      image: "/assets/images/testimonial1.jpg",
      quote: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
      name: "James K.",
      role: "Traveler",
      stars: 5,
    },
    {
      image: "/assets/images/testimonial2.jpg",
      quote: "I found exactly what I was looking for. Thank you for making it so pleasant and most of all hassle free! All features are great.",
      name: "Susan W.",
      role: "Designer",
      stars: 5,
    },
    {
      image: "/assets/images/testimonial3.jpg",
      quote: "Great service, great quality. I'm so happy with my purchase!",
      name: "Alex P.",
      role: "Entrepreneur",
      stars: 5,
    },
  ];
  const [active, setActive] = React.useState(0);
  const prev = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((active + 1) % testimonials.length);

  // Helper to get indices for left, center, right
  const getIndices = () => {
    const left = (active - 1 + testimonials.length) % testimonials.length;
    const right = (active + 1) % testimonials.length;
    return [left, active, right];
  };
  const indices = getIndices();

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex justify-center items-center w-full min-h-[400px] relative px-4">
        {indices.map((idx, pos) => {
          const t = testimonials[idx];
          const isActive = pos === 1;
          const positionClass = pos === 0 ? '-mr-16' : pos === 2 ? '-ml-16' : 'mx-0';
          return (
            <div
              key={idx}
              className={`transition-all duration-500 ${positionClass} ${isActive ? 'scale-100 opacity-100 z-30' : 'scale-90 opacity-50 z-10'} w-full max-w-xl ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[#b88e72]/20 transition-shadow duration-300">
                {/* Top Gradient Bar */}
                <div className="h-2 bg-linear-to-r from-[#b88e72] via-[#8b6d5a] to-[#b88e72]"></div>
                
                <div className="p-10">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  {/* Testimonial Quote */}
                  <p className="text-xl text-[#3d2c29] mb-6 leading-relaxed italic">&quot;{t.quote}&quot;</p>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <svg key={idx} className="w-5 h-5 text-[#b88e72]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                  
                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image src={t.image} alt={t.name} width={60} height={60} className="rounded-full object-cover ring-2 ring-white shadow-lg" />
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#3d2c29]">{t.name}</div>
                        <div className="text-sm text-gray-500">{t.role}</div>
                      </div>
                    </div>
                    
                    {/* Verified Text */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 rounded-full">
                      <svg className="w-4 h-4 text-[#b88e72]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs font-semibold text-[#b88e72]">Verified Purchase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-12">
        <button onClick={prev} title="Previous testimonial" className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#3d2c29] hover:bg-linear-to-r hover:from-[#b88e72] hover:to-[#8b6d5a] hover:text-white transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={next} title="Next testimonial" className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#3d2c29] hover:bg-linear-to-r hover:from-[#b88e72] hover:to-[#8b6d5a] hover:text-white transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
