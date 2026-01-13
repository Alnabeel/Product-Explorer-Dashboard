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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Discover Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection and find your favorites
        </p>
      </div>
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
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
}
