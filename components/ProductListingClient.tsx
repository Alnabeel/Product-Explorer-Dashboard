'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/types/product';
import ProductGrid from '@/components/ui/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';
import CategoryFilter from '@/components/ui/CategoryFilter';
import FavoritesFilter from '@/components/ui/FavoritesFilter';
import { getFavorites } from '@/lib/favorites';

interface ProductListingClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductListingClient({
  initialProducts,
  categories,
}: ProductListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

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
  }, [initialProducts, searchQuery, selectedCategory, showFavoritesOnly]);

  return (
    <div className="space-y-6">
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
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
