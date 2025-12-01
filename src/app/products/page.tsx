"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faHeart, faShoppingCart, faStar, faChevronDown, faTh, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  sku: string;
  category_id: string | null;
  images: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/products?skip=0&limit=100&is_active=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/categories?skip=0&limit=50&is_active=true');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.sale_price || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.sale_price || a.price) - (b.sale_price || b.price);
        case 'price-high':
          return (b.sale_price || b.price) - (a.sale_price || a.price);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
    setSortBy('newest');
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(String(price));
    return `R ${numPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const calculateDiscount = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
            DISCOVER OUR COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-linear-to-br from-[#3d2c29] via-[#b88e72] to-[#3d2c29] bg-clip-text text-transparent mb-6 leading-tight">
            Premium <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Fashion</span>
          </h1>
          <p className="text-lg md:text-xl text-[#3d2c29]/70 max-w-2xl mx-auto">
            Explore our curated collection of timeless pieces
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-[#3d2c29] mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent"
                  />
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b88e72] w-5 h-5"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-[#3d2c29] mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                        : 'hover:bg-gray-50 text-[#3d2c29]'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                          : 'hover:bg-gray-50 text-[#3d2c29]'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-[#3d2c29] mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-[#b88e72]"
                    aria-label="Maximum price"
                    title="Adjust maximum price"
                  />
                  <div className="flex justify-between text-sm text-[#3d2c29]/70">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 bg-gray-100 text-[#3d2c29] rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Products Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Results count */}
                <div className="text-[#3d2c29]/70">
                  Showing <span className="font-semibold text-[#3d2c29]">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="font-semibold text-[#3d2c29]">{filteredProducts.length}</span> products
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-lg font-medium flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent bg-white cursor-pointer"
                      aria-label="Sort products"
                      title="Sort products by"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                    </select>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b88e72] w-4 h-4 pointer-events-none"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                      title="Grid View"
                    >
                      <FontAwesomeIcon icon={faTh} className={`w-4 h-4 ${viewMode === 'grid' ? 'text-[#b88e72]' : 'text-gray-400'}`} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                      title="List View"
                    >
                      <FontAwesomeIcon icon={faList} className={`w-4 h-4 ${viewMode === 'list' ? 'text-[#b88e72]' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
                <div 
                  className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-[#3d2c29]">Filters</h2>
                      <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-[#b88e72]" title="Close filters" aria-label="Close filters">
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Search */}
                    <div>
                      <h3 className="text-lg font-bold text-[#3d2c29] mb-3">Search</h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72]"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b88e72] w-5 h-5" />
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-bold text-[#3d2c29] mb-3">Categories</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === null ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white' : 'hover:bg-gray-50 text-[#3d2c29]'
                          }`}
                        >
                          All Products
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.id ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white' : 'hover:bg-gray-50 text-[#3d2c29]'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="text-lg font-bold text-[#3d2c29] mb-3">Price Range</h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="100"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="w-full accent-[#b88e72]"
                          aria-label="Maximum price"
                          title="Adjust maximum price"
                        />
                        <div className="flex justify-between text-sm text-[#3d2c29]/70">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        clearFilters();
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-3 bg-gray-100 text-[#3d2c29] rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-[#b88e72] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-[#3d2c29]/70">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full hover:shadow-lg transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-[#3d2c29]/70 mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-6'
                }>
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                      formatPrice={formatPrice}
                      calculateDiscount={calculateDiscount}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#b88e72] hover:text-[#b88e72] transition-colors"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPage === pageNumber
                                ? 'bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white'
                                : 'border border-gray-200 hover:border-[#b88e72] hover:text-[#b88e72]'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="px-2">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#b88e72] hover:text-[#b88e72] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ 
  product, 
  viewMode, 
  formatPrice, 
  calculateDiscount 
}: { 
  product: Product; 
  viewMode: ViewMode; 
  formatPrice: (price: number) => string;
  calculateDiscount: (price: number, salePrice: number) => number;
}) {
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = product.sale_price || product.price;
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/assets/images/placeholder.jpg';

  const checkFavoriteStatus = React.useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/favorites/check/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.is_favorited);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  }, [token, product.id]);

  useEffect(() => {
    if (isAuthenticated && token) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, token, product.id, checkFavoriteStatus]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    if (!token) return;

    setIsTogglingFavorite(true);
    try {
      if (isFavorited) {
        const response = await fetch(
          `http://localhost:8000/api/v1/favorites/${product.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsFavorited(false);
        }
      } else {
        const response = await fetch('http://localhost:8000/api/v1/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id }),
        });

        if (response.ok) {
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
    } catch (error: unknown) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-64 h-64 sm:h-auto overflow-hidden shrink-0">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
          {hasDiscount && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
              -{calculateDiscount(product.price, product.sale_price!)}%
            </span>
          )}
          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
            title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FontAwesomeIcon 
              icon={isFavorited ? faHeart : faHeartOutline} 
              className={`w-5 h-5 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-xl font-bold text-[#3d2c29] mb-2 group-hover:text-[#b88e72] transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-[#3d2c29]/70 mb-4 line-clamp-2">
              {product.description || 'Premium quality product from our exclusive collection.'}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#b88e72]">
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="px-6 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        {hasDiscount && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
            -{calculateDiscount(product.price, product.sale_price!)}%
          </span>
        )}
        <button
          onClick={handleToggleFavorite}
          disabled={isTogglingFavorite}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon 
            icon={isFavorited ? faHeart : faHeartOutline} 
            className={`w-5 h-5 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-[#3d2c29] mb-2 group-hover:text-[#b88e72] transition-colors line-clamp-2 min-h-14">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon 
              key={i} 
              icon={faStar} 
              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-[#3d2c29]/60 ml-2">(4.0)</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-[#b88e72]">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full px-4 py-3 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
