'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product, Category } from '@/types/product';
import ProductGrid from '@/components/ui/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';
import CategoryFilter from '@/components/ui/CategoryFilter';
import FavoritesFilter from '@/components/ui/FavoritesFilter';
import { getFavorites } from '@/lib/favorites';
import { fetchProductsClient, fetchCategoriesClient } from '@/lib/api';
import ErrorState from '@/components/ErrorState';

export default function ProductListingClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProductsClient(),
          fetchCategoriesClient(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load products';
        setError(errorMessage);
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      const currentFavorites = getFavorites();
      filtered = filtered.filter((product) =>
        currentFavorites.includes(product.id)
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, showFavoritesOnly]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Section Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Discover Products
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Browse our curated collection and find your perfect match
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        <FavoritesFilter
          showFavoritesOnly={showFavoritesOnly}
          onChange={setShowFavoritesOnly}
        />
      </div>

      {/* Results Count */}
      {!isLoading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
}
