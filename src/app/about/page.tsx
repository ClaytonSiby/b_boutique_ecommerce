"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20">{/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
            OUR STORY
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-br from-[#3d2c29] via-[#b88e72] to-[#3d2c29] bg-clip-text text-transparent mb-6 leading-tight">
            Crafting Timeless <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Elegance</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Since our inception, B Boutique has been dedicated to bringing you the finest in fashion, 
            blending contemporary trends with timeless sophistication.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-2">1K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-2">4+</div>
              <div className="text-sm text-gray-600">States Served</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent mb-2">3+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image src="/assets/images/colour_dress.jpg" alt="Our Story" width={600} height={700} className="object-cover w-full h-[500px] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#b88e72]/15"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3d2c29]">
                Our <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Benedetto Luxury Boutique is a destination for timeless style and refined fashion for both men and women. We offer a curated selection of premium brands alongside high-quality non-branded pieces, combining versatility, elegance, and modern design. At Benedetto, our mission is to make luxury accessible while empowering you to express your unique style with confidence and sophistication.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our commitment to quality, authenticity, and customer satisfaction has been the cornerstone of our success. 
                We carefully curate each piece in our collection, ensuring that it meets our high standards of craftsmanship 
                and design.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 px-4 py-3 rounded-full">
                  <svg className="w-5 h-5 text-[#b88e72]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-[#3d2c29] font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center gap-3 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 px-4 py-3 rounded-full">
                  <svg className="w-5 h-5 text-[#b88e72]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-[#3d2c29] font-medium">Sustainable Fashion</span>
                </div>
                <div className="flex items-center gap-3 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 px-4 py-3 rounded-full">
                  <svg className="w-5 h-5 text-[#b88e72]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-[#3d2c29] font-medium">Country Wide Presence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#f8f8f8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
              WHAT WE STAND FOR
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3d2c29] mb-4">
              Our Core <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These principles guide everything we do, from product selection to customer service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#3d2c29] mb-4">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise on quality. Every product in our collection is carefully vetted to ensure 
                it meets our exacting standards of craftsmanship and durability.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-[#8b6d5a] to-[#6b5d4a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#3d2c29] mb-4">Customer Love</h3>
              <p className="text-gray-600 leading-relaxed">
                Our customers are at the heart of everything we do. We strive to create meaningful relationships 
                and deliver experiences that exceed expectations.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#3d2c29] mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                We are committed to sustainable practices, from eco-friendly packaging to supporting ethical 
                manufacturing processes that respect both people and planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
              OUR TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3d2c29] mb-4">
              Meet The <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Experts</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Passionate individuals dedicated to bringing you the best in fashion
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-xl">
                <Image src="/assets/images/founder_image.jpg" alt="Team Member" width={300} height={400} className="object-cover w-full h-80 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[#b88e72]/15"></div>
              </div>
              <h3 className="text-xl font-bold text-[#3d2c29] mb-1">Khomotso Penani</h3>
              <p className="text-[#b88e72] font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">Visionary leader with 5+ years in retail and business development</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-xl">
                <Image src="/assets/images/head_of_engineering.jpg" alt="Team Member" width={300} height={400} className="object-cover w-full h-80 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-[#3d2c29]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[#d4a574]/15"></div>
              </div>
              <h3 className="text-xl font-bold text-[#3d2c29] mb-1">Clayton Siby</h3>
              <p className="text-[#b88e72] font-medium mb-3">Lead Software Engineer</p>
              <p className="text-gray-600 text-sm">Our lead Software Engineer with a passion for innovation and technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#3d2c29] via-[#4d3c39] to-[#3d2c29]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,142,114,0.2),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Fashion <span className="bg-linear-to-r from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-[#f7e6e1]/80 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a movement that values quality, sustainability, and timeless style. 
            Discover your perfect piece today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="group px-8 py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all duration-300 shadow-2xl hover:shadow-[#b88e72]/50 hover:scale-105">
              Shop Collection
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      </div>
  );
}
