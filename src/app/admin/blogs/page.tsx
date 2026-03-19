"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';
import { useToastStore } from '@/lib/store/toast';

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  is_published: boolean;
  created_at: string;
}

export default function BlogsAdmin() {
  const toast = useToastStore();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get<Blog[]>('/api/v1/blogs');
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    setDeleting(slug);
    try {
      await api.delete(`/api/v1/blogs/${slug}`);
      setBlogs(blogs.filter((b) => b.slug !== slug));
      toast.success('Blog post deleted successfully', 'Success');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      toast.error('Failed to delete blog', 'Error');
    } finally {
      setDeleting(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Manage your blog posts
          </p>
        </div>
          <Link
            href="/admin/blogs/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Blog
          </Link>
      </div>
      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
          />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
          />
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {filteredBlogs.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500 text-sm">
                No blog posts found
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div key={blog.id} className="p-4 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{blog.title}</div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">{blog.slug}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{blog.summary}</div>
                  </div>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-gray-100">
                      <Link href={`/admin/blogs/${blog.slug}`} className="hover:underline">
                        {blog.title}
                      </Link>
                    <span
                      className={`px-2 py-0.5 font-semibold rounded-full ${
                        blog.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {blog.is_published ? 'Published' : 'Draft'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blogs/${blog.slug}/edit`}
                        className="text-[#b88e72] hover:text-[#8b6d5a] p-2"
                        title="Edit blog"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.slug)}
                        disabled={deleting === blog.slug}
                        className="text-red-600 hover:text-red-800 p-2 disabled:opacity-50"
                        title="Delete blog"
                      >
                        {deleting === blog.slug ? (
                          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                        ) : (
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Desktop Table View */}
          <table className="hidden lg:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                  Summary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No blog posts found
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-32 truncate" title={blog.slug}>
                      {blog.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-64 truncate" title={blog.summary}>
                      {blog.summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {blog.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/${blog.slug}/edit`}
                          className="text-[#b88e72] hover:text-[#8b6d5a] p-2"
                          title="Edit blog"
                        >
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          disabled={deleting === blog.slug}
                          className="text-red-600 hover:text-red-800 p-2 disabled:opacity-50"
                          title="Delete blog"
                        >
                          {deleting === blog.slug ? (
                            <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                          ) : (
                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
