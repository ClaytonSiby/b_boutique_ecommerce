"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEye, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  category: string | null;
  author_id: string;
  is_published: boolean;
  published_at: string | null;
  views_count: number;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = React.useCallback(async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      const response = await fetch(
        `http://localhost:8000/api/v1/blog?skip=0&limit=50&published_only=true${categoryParam}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/blog/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
            OUR BLOG
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-br from-[#3d2c29] via-[#b88e72] to-[#3d2c29] bg-clip-text text-transparent mb-6 leading-tight">
            Fashion <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-[#3d2c29]/70 max-w-3xl mx-auto mb-12">
            Discover the latest trends, styling tips, and fashion inspiration from our curated collection of articles.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-[#b88e72] focus:outline-none transition-colors text-[#3d2c29]"
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#b88e72] w-5 h-5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white shadow-lg'
                : 'bg-white text-[#3d2c29] border border-gray-200 hover:border-[#b88e72]'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white shadow-lg'
                  : 'bg-white text-[#3d2c29] border border-gray-200 hover:border-[#b88e72]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#3d2c29]/70">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#3d2c29]/70">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Featured Image */}
                <div className="relative h-64 overflow-hidden">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#b88e72] to-[#8b6d5a] flex items-center justify-center">
                      <span className="text-white text-6xl font-bold opacity-20">B</span>
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#b88e72] text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-[#3d2c29]/60 mb-3">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                      {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                      {post.views_count}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#3d2c29] mb-3 line-clamp-2 group-hover:text-[#b88e72] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#3d2c29]/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#b88e72] font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/images/newsletter.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-linear-to-br from-[#d4a574]/20 to-[#b88e72]/20"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss a Post
            </h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter and get the latest fashion insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-[#b88e72] rounded-full font-semibold hover:bg-[#f7e6e1] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
