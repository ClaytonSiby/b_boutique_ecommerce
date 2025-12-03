'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faSpinner,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';
import axios from 'axios';
import { useToastStore } from '@/lib/store/toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
  is_active: boolean;
  products_count?: number;
}

export default function CategoriesAdmin() {
  const toast = useToastStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>('/api/v1/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        slug: generateSlug(formData.name),
      };

      if (editing) {
        await api.patch(`/api/v1/categories/${editing}`, payload);
        toast.success('Category updated successfully', 'Success');
      } else {
        await api.post('/api/v1/categories', payload);
        toast.success('Category created successfully', 'Success');
      }
      setFormData({ name: '', description: '' });
      setEditing(null);
      setShowAddForm(false);
      fetchCategories();
    } catch (error: unknown) {
      console.error('Failed to save category:', error);
      let errorMessage = 'Failed to save category';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, editing ? 'Update Failed' : 'Creation Failed');
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setEditing(category.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    setDeleting(id);
    try {
      await api.delete(`/api/v1/categories/${id}`);
      setCategories(categories.filter((c) => c.id !== id));
      toast.success('Category deleted successfully', 'Success');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category', 'Error');
    } finally {
      setDeleting(null);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditing(null);
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Organize your products into categories
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg transition-shadow whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            Add Category
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            {editing ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                placeholder="e.g., Women's Clothing"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                placeholder="Category description..."
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg transition-shadow"
              >
                <FontAwesomeIcon icon={faSave} className="w-3 h-3 sm:w-4 sm:h-4" />
                {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-3 h-3 sm:w-4 sm:h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-8 h-8 text-[#b88e72] animate-spin"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 text-sm">
              No categories found
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">{category.slug}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      category.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {category.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {category.products_count || 0} products
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-[#b88e72] hover:text-[#8b6d5a] transition-colors"
                      title="Edit category"
                    >
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={deleting === category.id}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                      title="Delete category"
                    >
                      {deleting === category.id ? (
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
      )}
    </div>
  );
}
