
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '@/components/ImageUpload';
import { api } from '@/lib/api';

interface Category {
  id: string;
  name: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  is_published: boolean;
}

export default function NewBlogPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "",
    tags: "",
    is_published: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use blog categories endpoint if available, else fallback to product categories
        let response;
        try {
          response = await api.get<string[]>("/api/v1/blogs/categories");
          setCategories(response.data.map((name) => ({ id: name, name })));
        } catch {
          const fallback = await api.get<Category[]>("/api/v1/categories/");
          setCategories(fallback.data || []);
        }
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  interface ApiError {
    response?: {
      data?: {
        detail?: string;
      };
    };
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/v1/blogs", formData);
      router.push("/admin/blogs");
    } catch (err: unknown) {
      const apiError = err as ApiError;
      if (
        typeof apiError === "object" &&
        apiError !== null &&
        apiError.response &&
        typeof apiError.response === "object" &&
        apiError.response.data
      ) {
        setError(apiError.response.data.detail || "Failed to create blog");
      } else {
        setError("Failed to create blog");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back to Blogs
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Blog Post</h1>
        <p className="mt-2 text-gray-600">
          Create a new blog post for your store
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                placeholder="Short summary of the blog post"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                rows={6}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                  placeholder="e.g. fashion, summer, tips"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h2>
          <ImageUpload
            value={formData.featured_image ? [formData.featured_image] : []}
            onChange={(images) => setFormData({ ...formData, featured_image: images[0] || "" })}
            maxFiles={1}
          />
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-5 h-5 text-[#b88e72] border-gray-300 rounded focus:ring-[#b88e72]"
            />
            <span className="text-sm font-medium text-gray-700">
              Publish this blog post
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                Create Blog Post
              </>
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
      </form>
    </div>
  );
}
