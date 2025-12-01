"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faEye, faTag, faArrowLeft, faShare } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string | null;
  author_id: string;
  is_published: boolean;
  published_at: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/v1/blog/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error('Failed to fetch blog post');
      }
      
      const data = await response.json();
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#3d2c29]/70">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-[#3d2c29] mb-4">Oops!</h1>
          <p className="text-xl text-[#3d2c29]/70 mb-8">{error || 'Article not found'}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full hover:shadow-lg transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#b88e72] hover:text-[#8b6d5a] transition-colors font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category */}
        {post.category && (
          <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3d2c29] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#3d2c29]/60 mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 text-[#b88e72]" />
            {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-[#b88e72]" />
            {post.views_count} views
          </span>
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-[#b88e72] hover:text-[#b88e72] transition-all"
          >
            <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-[#3d2c29]/80 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 flex-wrap">
              <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-[#b88e72]" />
              {post.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#f7e6e1] text-[#8b6d5a] text-sm rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter for more fashion insights and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-[#b88e72] rounded-full font-semibold hover:bg-[#f7e6e1] transition-colors whitespace-nowrap"
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
